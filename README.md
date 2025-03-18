
**My Bot Hunter v2.0** 🚀

**About the Project**

My Bot Hunter is an automation tool built with Playwright, Cucumber, and TypeScript, designed to streamline job searching on LinkedIn. Currently, it focuses on finding "QA Automation Engineer" roles and supports the "Easy Apply" feature.

At this stage, the bot can apply to jobs that have a "Submit Application" button, making the process more efficient for job seekers.

**Features**

✅ Searches for QA Automation Engineer roles on LinkedIn

✅ Filters results using Easy Apply

✅ Applies only to jobs with the "Submit Application" button

✅ Sends an emails with Applied Jobs Details (Title + Link of the applied job)

✅ Has an automatically daily job search in Github Actions

🚀 More coming !


**Getting Started**

To run My Bot Hunter locally, you need:

 - Node.js installed
 - Visual Studio Code installed
 - Playwright and Cucumber set up in VS Code

**Clone the repository and install dependencies:**
 - git clone https://github.com/silviucaprar/My_Bot_Hunter.git  
 - cd My_Bot_Hunter  
 - npm install

**Before running the test**
 - Create and .env file and store your EMAIL_USER = '', EMAIL_PASS = '' (create an app password from Google security settings to use instead of your personal email password), LINKEDIN_PASS = ''

**Run the test:**
 - npm run mytest
