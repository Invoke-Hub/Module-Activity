:: Git Organization Command
@echo off
set /P O=Enter git option: 
:switch-case-option

    goto :switch-case-O-%O% 2>nul || (
        echo "Option not available, Available Options Are (init, push, pull)."
        exit
    )

    :switch-case-O-init
        cd ./src/modules/
        rmdir .git /s /q
        git init
        git remote add module-activity https://github.com/Invoke-Hub/Module-Activity.git
        git pull
        git fetch
        git checkout -f module-activity/main
        exit

    :switch-case-O-push (
        set /P C=Enter commit message: 

        cd ./src/modules/
        git add ./game/activity/*
        git add ./readme.md
        git commit -m "%C%"
        git push -u module-activity HEAD:main
        exit
    )

    :switch-case-O-pull
        cd ./src/modules/
        git init .
        git branch -M main
        git remote add module-activity https://github.com/Invoke-Hub/Module-Activity.git
        git pull module-activity main
        exit