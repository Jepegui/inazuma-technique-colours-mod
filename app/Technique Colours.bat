@echo off
rem Opens Technique Colours in a window of its own (with Microsoft Edge, which comes with Windows).
start "" msedge --app="file:///%~dp0technique-colours.html" --window-size=1300,900
