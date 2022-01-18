openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -outform PEM -out private.pem
openssl rsa -in private.pem -pubout -outform PEM -out public.pem

cat <<_EOI_ | mongosh
use obmm
db.users.deleteMany({})
db.users.insertOne({ username: 'test1',    password: crypto.createHash('md5').update('t1').digest('hex') })
db.users.insertOne({ username: 'test2',    password: crypto.createHash('md5').update('t2').digest('hex') })
db.users.insertOne({ username: 'test3',    password: crypto.createHash('md5').update('t3').digest('hex') })
db.users.insertOne({ username: 'test4',    password: crypto.createHash('md5').update('t4').digest('hex') })
_EOI_
