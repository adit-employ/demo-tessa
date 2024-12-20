@echo off

set countdown=60

TITLE XMU GATEWAY
ECHO "=============================================="
ECHO "==========>> SERVICE XMU GATEWAY <<==========="
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

cd C:\git\aditya_git_xsis\XTPO\xtpo-gateway\Xmu_Gateway.WebApi
dotnet run

TITLE XMU GATEWAY
ECHO Success running service academy backend ...
ECHO ----------------------------------------------