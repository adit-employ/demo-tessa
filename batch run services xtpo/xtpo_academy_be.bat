@echo off

set countdown=40

TITLE BE
ECHO "=============================================="
ECHO "=========>> SERVICE ACADEMY BACKEND <<========"
ECHO "=============================================="

ECHO Please wait %countdown% second ...

:timer_loop
	::cls
	echo Waiting %countdown% seconds...

	timeout /t 1 /nobreak >nul
	set /a countdown=%countdown% -1
	if %countdown% NEQ -1 goto :timer_loop

ECHO(
ECHO(
ECHO Starting service academy backend ...

cd C:\git\aditya_git_xsis\XTPO\xtpo-academy-be\Xsis_Academy.WebApi 
dotnet run

TITLE BE
ECHO Success running service academy backend ...
ECHO ----------------------------------------------