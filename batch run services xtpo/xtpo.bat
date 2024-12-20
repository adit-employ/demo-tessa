@ECHO OFF

SET varTimer = 40
SET firstInstanceVariable="Hello world!"
SET secondInstanceVariable="Good bye world!"

TITLE ALISA
GOTO:MAIN



:: 👇 REGION START ===> define the function under below <===
:fnHeader
    ECHO "=============================================="
	ECHO "===========>> Running Program Ku <<==========="
	ECHO "=============================================="
    ECHO(
    ECHO(
EXIT /B 0

:FnOpenExplorer
    ECHO ----------------------------------------------
    ECHO Opening explorer with path project XTPO ...
    start %windir%\explorer.exe "C:\git\aditya_git_xsis\XTPO"
    Timeout /t 2 /nobreak >nul
	ECHO Success opening explorer ...
    ECHO ----------------------------------------------
	ECHO(
	ECHO(
EXIT /B 0

:FnOpenFrontend
    ECHO ----------------------------------------------
	ECHO Opening visual studio code Front-end ...
	code "" "C:\git\aditya_git_xsis\XTPO\xtpo-academy-fe\academy-web" | exit
	Timeout /t 10 /nobreak >nul
	ECHO Success opening visual studio code ...
    ECHO ----------------------------------------------
	ECHO(
	ECHO(
EXIT /B 0

:FnRunBE
    ECHO ----------------------------------------------
	ECHO Opening service academy backend ...
    start cmd /k xtpo_academy_be.bat
    ECHO Success opening service academy backend ...
    ECHO ----------------------------------------------
	ECHO(
	ECHO(
EXIT /B 0

:FnRunXMU
    ECHO ----------------------------------------------
	ECHO Opening service XMU gateway ...
    start cmd /k xtpo_xmu_gateway.bat
    ECHO Success opening service XMU gateway ...
    ECHO ----------------------------------------------
	ECHO(
	ECHO(
EXIT /B 0

:FnRunWSL
	ECHO ----------------------------------------------
	ECHO Opening WSL ...
	title WSL 
	wsl

:: 👇 REGION END ===> define the function under below <===


:MAIN
    call:fnHeader
    call:FnOpenExplorer
    call:FnOpenFrontend
    call:FnRunBE
    call:FnRunXMU
    call:FnRunWSL
    PAUSE
EXIT /B 0