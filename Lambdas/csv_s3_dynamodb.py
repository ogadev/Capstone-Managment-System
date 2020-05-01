import boto3
import datetime

#This is a file that is triggered by students.csv being dropped into our s3 bucket. When the file is dumped it triggers this lambda function
#which then reads the file and parses it into a dynamoDB table called Students.

s3_client = boto3.client("s3")

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Students')

def lambda_handler(event, context):
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    s3_file_name = event['Records'][0]['s3']['object']['key']
    resp = s3_client.get_object(Bucket=bucket_name,Key=s3_file_name)
    data = resp['Body'].read().decode("utf-8")
    students = data.split("\n")
    
    now = datetime.datetime.now()
    year = now.year
    month = now.month
    term = ""
    if month > 0 and month <= 7:
        term = "Spring" + str(year)
    elif month <= 12 and month > 7:
        term = "Fall" + str(year)
        
    for stu in students:
        stu_data = stu.split(",")
        #Add to DynamoDB
        try:
            table.put_item(
            Item = {
             "id" : stu_data[0],
             "posting_id" : stu_data[1],
             "first_name" : stu_data[2],
             "last_name" : stu_data[3],
             "section" : stu_data[4],
             "status" : stu_data[5],
             "units" : stu_data[6],
             "grade_basis" : stu_data[7],
             "program_and_plan" : stu_data[8],
             "academic_level" : stu_data[9],
             "asurite" : stu_data[10],
             "residency" : stu_data[11],
             "Term": term,
            }
            )
        except Exception as e:
            print("End of File")
