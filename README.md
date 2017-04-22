# GO READ!
### Problem:
   Do you know how much time your son or daughter has read today, this week or last week? Does your child need to record and report the time they read outside of school to their teacher?  Or, do you know how much time you’ve set aside to read?  Last, would you like to block the use of your child’s phone from games and texting until they finish their daily reading requirements?  

### Solution:
Go Read has the solution for you!  Easily track the time and how much reading your child or yourself has completed right from your phone.  With a built-in timer, you or your child can monitor the time spent reading.  In addition, the time can be manually entered and approved by the parent.  With built in reporting, you can get the latest information or generate a report for the week.  In addition, if your child would rather play games on their phone/iPad than read, you can block them until they met their reading requirements.

### Market:
The initial market is for young readers ages 8-12 but with the option to market to anyone who wants improve themselves through reading.   For example, this would be an easy way to track your New Year’s resolution to read 30 minutes a day.  It’s the activity tracker for readers!!  Activity trackers currently track how many steps you’ve taken, expand that to how much have you have read today.  We all need to take care of our minds and body! 

## Key Features:
Some the key features include:
+   Web and mobile friendly
+ Built-in timer
+ Book search
+ Recommend Books
+ Approval of child’s reading log
+ Reporting capabilities
++  Current activity
++  Progress Report
++  Detailed Activity Report

## Competition
There are several applications with similar functionality including:
+ Reading Rewards – web application but targeting younger audience
+ You-log – iPhone only application but with the most features
+ Whooo’s Reading – limited functionality

## Minimum Viable Product
The MVP includes:
Web Application
+ Create User Account
+ Logon
+ Search Books
+ Add Books
+ Track Time
+ Report Time
Mobile Application
+ Logon
+ Track Time

### Database Architecture:
The MySQL database was selected due to the number of tables and the multitude of relationships between the tables.  But, to allow the system to grow with the number of users it would be recommended to partition some tables such as the table which log the users’ activities as it could balloon in size and cause performance issues.  Last, with the current schema, it will be relatively easy to add additional tables to support new functionality for the application.

 ![GO READ Login](/assets/images/DatabaseArchitecture.png "Database Architecture")

### User Acquisition:
To acquire the first fifty users, we will simply use word of mouth starting with my own children as pilot users and expanding to their friends and family.
To expand to the next level will require advertising and hopefully some positive feedback from the initial users.
Currently there are no plans for being acquired but we are leaving all options open.

![GO READ Main](/assets/images/goread_main.jpg "GO READ Main")

![GO READ Reader](/assets/images/goread_reader_b.jpg "GO READ Reader")

![GO READ Parent](/assets/images/goread_parent.jpg "GO READ Parent")