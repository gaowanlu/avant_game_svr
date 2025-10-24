set NW_PATH=.\nwjs\nw.exe 

if not exist "%NW_PATH%" (
    echo Error: nw.exe not found at %NW_PATH%
    pause
    exit /b 1
)

"%NW_PATH%" .

pause