from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
from cx_Oracle import connect

app = Flask(__name__)
CORS(app)

@app.route('/get_scores', methods=['GET'])
def get_scores():
    age = request.args.get('age')  # URL에서 age 값을 가져옵니다.
    gender = request.args.get('gender')  # URL에서 gender 값을 가져옵니다.

    if not age or not gender:
        return jsonify({'message': 'Age and Gender are required'}), 400

    con = connect("id/pass@1.1.1.1:1521/xe")
    sql = """SELECT 
             JPR_PRODUCTCODE,
             SUM(JPR_SCORE) AS TotalScore
         FROM 
             JUVE_PRODUCT_RECOMMENDATION
         WHERE 
             CASE 
                 WHEN JPR_AGE BETWEEN 10 AND 19 THEN '10'
                 WHEN JPR_AGE BETWEEN 20 AND 29 THEN '20'
                 WHEN JPR_AGE BETWEEN 30 AND 39 THEN '30'
                 WHEN JPR_AGE BETWEEN 40 AND 49 THEN '40'
                 WHEN JPR_AGE BETWEEN 50 AND 59 THEN '50'
                 ELSE '60'
             END = :age
             AND JPR_GENDER = :gender
         GROUP BY 
             JPR_PRODUCTCODE
         ORDER BY 
             JPR_PRODUCTCODE"""
    
    df = pd.read_sql(sql, con, params={'age': age, 'gender': gender})
    result = df.to_dict(orient='records')
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=42424)
