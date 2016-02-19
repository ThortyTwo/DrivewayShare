# A guide to contributing #

Hopefully one time steps:
1. Fork the repo
2. Clone your fork to your local machine
  > git clone https://github.com/**yourAcctName**/DrivewayShare.git
3. Add an upstream that points to the main repo
  > git remote add upstream https://github.com/ThortyTwo/DrivewayShare.git
4. Install npm and bower dependencies
  > npm install

Steps that are repeated:
1. Update/sync your local code with the code from the main repo
  > git pull --rebase upstream dev
2. Reinstall npm and bower dependencies if necessary.
2. Create a new branch for your contribution
  > git checkout -b **branchName**
3. Write your code, then add your changes
  > git add **yourFile**
4. Commit your changes, with a message (see below for guide to commit messages)
  > git commit -m "[**type**] description of commit"
5. Re-update/re-sync your local code with the code from the main repo
  > git pull --rebase upstream dev
6. Resolve any conflicts and commit again if neccessary
7. Push to your origin (your forked copy)
  > git push origin **branchName**
8. Open a pull request


### Git Style Guide

Branch Names: please use **type/description** with camel-casing
	> feature/logoutButton

Commit Messages: please use **[Type] Description** with first letter of type capitalized.  Description should have proper punctuation/capitalization and be in past tense.
  > [Feature] Added button that allows user to logout

Possible types include: setup, feature, refactor, bugfix

#### Thanks for your contributions!