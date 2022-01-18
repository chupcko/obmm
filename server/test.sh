JWT=$( \
  curl -s \
    -X POST \
    -H 'Content-Type: application/json' \
    -d '{ "username": "test1", "password": "t1" }' \
    'http://localhost:8080/api/auth/log_in' | \
  jq .jwt | \
  cut -d \" -f 2 \
)

curl -s \
  -X POST \
  -H "Authorization: Baerer ${JWT}" \
  'http://localhost:8080/api/auth/check_in' | \
jq
