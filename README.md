<h1>Introduction</h1>
This repo is about uploading an image to AWS S3 bucket in Ionic 3 application. 
<br/><br/>
Refer below article for complete guidance, <br/>  
https://medium.com/@shamique/upload-an-image-to-s3-bucket-in-ionic-app-5dc96b772d48

<h1>Prerequisite</h1>
<ul>
<li>Ionic 3 intalled</li>
<li>NodeJS (Latest version)</li>
<br/>
<b>Below AWS services created and configured,</b>
<li>Cognito pool</li>
<li>Identity pool</li>
<li>S3 bucket</li>
</ul>


<h1>How to run ?</h1>
<ul>
<li>Clone the project to your local machine</li>
<li>Add AWS settings in system-variable.ts file (../providers/system-variable/system-variable.ts)</li>
<li>In S3-service.ts (../providers/s3-service), line number 15, set region_name and userpool id</li>
<br/>
- <b>In terminal, run below commands:</b>
<li><code>npm install</code></li>
<li><code>ionic integrations enable cordova --add</code></li>
<li><code>ionic cordova platform add android</code></li>
<li><code>ionic cordova build android</code></li>
<li><code>ionic cordova run android</code></li>
</ul>
