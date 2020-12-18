import numpy as np
import pandas as pd
from sklearn.feature_extraction import DictVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = False

bookDF=pd.read_csv('books.csv', error_bad_lines=False) 
bookDF=bookDF.drop(['small_image_url','title','best_book_id','isbn','isbn13'], axis=1)
ratingsDF = pd.read_csv('ratings.csv', error_bad_lines=False) 

listOfDictonaries=[]
indexMap = {}
reverseIndexMap = {}
ptr=0;
testdf = ratingsDF
testdf=testdf[['user_id','rating']].groupby(testdf['book_id'])
pairwiseSimilarity = {}

for groupKey in testdf.groups.keys():
    tempDict={}

    groupDF = testdf.get_group(groupKey)
    for i in range(0,len(groupDF)):
        tempDict[groupDF.iloc[i,0]]=groupDF.iloc[i,1]
    indexMap[ptr]=groupKey
    reverseIndexMap[groupKey] = ptr
    ptr=ptr+1
    listOfDictonaries.append(tempDict)


dictVectorizer = DictVectorizer()
vector = dictVectorizer.fit_transform(listOfDictonaries)


pairwiseSimilarity = cosine_similarity(vector) 

def getBookDetails(bookID):
    return {
        'title': bookDF[bookDF['id']==bookID]['original_title'].values[0],
        'author': bookDF[bookDF['id']==bookID]['authors'].values[0],
        'image': bookDF[bookDF['id']==bookID]['image_url'].values[0],
        'bookId': bookID
    }


def getTopRecommendations(bookID):
    row = reverseIndexMap[bookID]
    
    similarBookIDs = [indexMap[i] for i in np.argsort(pairwiseSimilarity[row])[-7:-2][::-1]]
    return list(map(getBookDetails, similarBookIDs))
    
if __name__ == '__main__':
   
    @app.route('/books', methods=['POST'])
    def send_books():
        results = {
            'selectedBook': getBookDetails(request.json['bookId']),
            'results': getTopRecommendations(request.json['bookId'])
        }
        return jsonify(results)

    app.run(host='0.0.0.0')







