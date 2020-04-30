notifications:  
  email:  
    recipients:  
    - shankar.tester901@gmail.com
    on_success: never  
    on_failure: always
language: node_js
node_js:
  - 8
install:
  - npm install -g zcatalyst-cli
jobs:
  include:
    - stage: unit tests
      before_script:
        - echo 'applogic testing!!'
        - cd functions/random_names
      script:
        - echo 'Installing Deps!'
        - npm install
        - echo 'Testing using jest'
        - npm test
      after_success:
        - cd ../../
        - echo 'deploying!!!'
        - catalyst deploy --project 3296000000009001
      after_failure:
        - echo 'Test failed'
