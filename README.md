***User friends relations***

* run ``npm install`` in project dir
* then run
 ```node node_modules/.bin/sequelize db:migrate```
  or on first time run
   ``npm run syncdb`` (it will forcefully delete and re create all table)
* load seeds by running ``node node_modules/.bin/sequelize db:seed:all``

* Some sample test cases are in tests/tests.js. To run the test cases ``npm run test``

* find post man collections in ``collections`` dir


**docker image**

if interested in docker image then

* run ```docker build . -t friends```
* run ``docker run -p 3000:80 friends``  (if you are on windows or mac just connect to your local db else I feel u :)
