# nr-graphics-senate-impeachment
A tracker of which GOP senators support the impeachment, January 2020.

spreadsheet url: <https://docs.google.com/spreadsheets/d/1OlhlWdkKMnZbLKhcx8QpZKNqYzB0NBREIlql85QCoGY/edit#gid=0>

run `gulp` to fetch data from Google sheet
Data will be in `data.json`
for development run `http-server`

To deploy simply upload
`index.html` `app.js` `data.json` and `style.css`

## Update instruction

1. Once you get a message from Arts reporter/editors, run `gulp`
2. upload data.json by running `scp data.json <YOUR_USERNAME>@shell.boston.com:/web/bgapps/html/metro/graphics/2021/01/impeachment-trial/data.json`
3. ssh into shell.boston.com and run `upload /web/bgapps/html/metro/graphics/2021/01/impeachment-trial/data.json`
4. check to make sure it looks OK <https://www.bostonglobe.com/2021/01/25/metro/heres-where-senate-republicans-stand-convicting-donald-trump/>
