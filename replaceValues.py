import sys

# Get variables from cli arguments

args = {}

args['BLOCKCHAIN-NETWORK'] = sys.argv[1]
args['MAGIC-API-KEY'] = sys.argv[2]
args['TRANSLATE-API-KEY'] = sys.argv[3]

# For each key in args, replace the value in the file .env.production

for key, value in args.items():
    with open('.env.production', 'r') as file :
        filedata = file.read()

    filedata = filedata.replace(key, value)

    with open('.env.production', 'w') as file:
        file.write(filedata)

print(".env file replaced correctly")