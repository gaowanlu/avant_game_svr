@echo off
:: 设置 NW.js 可执行文件的路径（假设 nw.exe 在上一级目录）
set NW_PATH=..\nw.exe

:: 检查 nw.exe 是否存在
if not exist "%NW_PATH%" (
    echo Error: nw.exe not found at %NW_PATH%
    pause
    exit /b 1
)

:: 执行 NW.js 命令，运行当前目录的应用程序
"%NW_PATH%" .

:: 暂停以查看错误信息（可选）
pause