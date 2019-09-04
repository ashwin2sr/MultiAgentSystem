$(document).ready(function() {

    var agentCount = 0;
    var softCount = 0;
    var operationCount = 0;
    var levelOneCounter = 0;
    var levelTwoCounter = 0;
    var levelThreeCounter = 0;
    var levelLastCounter = 0;
    var connectionCounter = 0;
    var connection = [];
    var connectionValue = [];

    // var selectedLevel;
    // var givenWeight;
    // var jsObj = {}
    // var operationOneArray = [];
    // var operationTwoArray = [];
    // var operationThreeArray = [];
    // var softArray = [];
    // var actorArray = [];
    // var connectionArray = [];
    // var mainActor;
    // var equalCount = 0;
    // var contributionValue = 0;

    // Counter values to for soft goals


    // DRAG AND DROP CODE
    jQuery(function($) {

        $('.workArea').droppable({
            accept: '.nav .draggable',
            drop: function(event, ui) {
                var $clone = ui.helper.clone();
                if (!$clone.is('.inside-drop-zone')) {
                    if ($clone.hasClass("softItem")) {
                        softCount++;

                        $(this).append($clone.addClass('added soft' + softCount).draggable({
                            containment: '.workArea  '
                        }));
                    } else {
                        operationCount++;
                        $(this).append($clone.addClass('added operation' + operationCount).draggable({
                            containment: '.workArea'
                        }));
                    }

                }
            }
        });

        $('.nav .draggable').draggable({
            helper: 'clone'
        });
    });


    // AGENT OPTION CODE
    $(document).on("click", ".agentItem", function() {
        $('#modalWindow').modal('show');
        $('#modalWindow .modal-content').removeClass('agentModal softModal operationModal connectionModal actorModal');
        $('#modalWindow').find('.modal-content').addClass('agentModal')
            //Resets all input value
        $('input[type=text]').each(function() {
            $(this).val('');
        });
    });

    $(document).on("click", ".agentModal .updateModal", function() {
        //Incrementing agent count whenever user creates a new agent
        agentCount++;
        var newAgentName = $('.agentName').val();
        var newMainGoalName = $('.mainGoalName').val();
        $('#modalWindow').modal('hide');
        // Displaying the actor name in work area
        $('.workArea').append('<div class="agentWorkArea agent' + agentCount + ' ' + newAgentName + '"><p class="agentHead btn btn-primary"></p></div>');
        $(".agent" + agentCount + " .agentHead").html(newAgentName);
        $('.agent' + agentCount + '').append('<li class="mainGoalAdded added softItem agentHead mainGoal ' + newMainGoalName + '"><a>' + newMainGoalName + '</a></li>')
        var agentNumber = 'agent' + agentCount;
        //Saving the main goal of the agent 
        window[agentNumber + "_mainGoal"] = newMainGoalName;
        //Populating the select box of Actors
        $('.agent-select').append('<option value=' + agentNumber + '>' + newAgentName + '</option>');
    });


    // SOFT OPTION CODE
    $(document).on("click", ".added.softItem", function() {
        $('.added').removeClass('active');
        $(this).addClass('active');
        $('#modalWindow').modal('show');
        $('#modalWindow .modal-content').removeClass('agentModal softModal operationModal connectionModal actorModal');
        $('#modalWindow').find('.modal-content').addClass('softModal');
        //Resets all input value
        $('input[type=text]').each(function() {
            $(this).val('');
        });
        //Reset Level Value
        $('.level-select').val('');
    });

    $(document).on("change", ".level-select", function() {
        var newSoftLevel = $('.level-select').val();
        var tempAgentNumber = $('.agent-select').val();

        // CHANGING FORM BASED ON THE LEVEL SELECTED
        if (newSoftLevel == 'last') {
            $('.softModal .modalContent.softContent.softContentContribution').css('display', 'block');
            $('.softModal .modalContent.softContent.softContentWeight').css('display', 'block');
        } else {
            $('.softModal .modalContent.softContent.softContentContribution').css('display', 'block');
            $('.softModal .modalContent.softContent.softContentWeight').css('display', 'none');

            if (newSoftLevel == '1') {
                $('.contribution-select').removeAttr('multiple', 'multiple');
                //Populating the select box of Main Goal
                if ($(".contribution-select option[value=" + window[tempAgentNumber + "_mainGoal"] + "]").length == 0) {
                    $('.contribution-select').empty().append('<option value=' + window[tempAgentNumber + "_mainGoal"] + '>' + window[tempAgentNumber + "_mainGoal"] + '</option>');
                }
            } else if (newSoftLevel == '2') {
                //Populating the select box of level 1 Goal
                $('.contribution-select').empty()
                $('.contribution-select').attr('multiple', 'multiple');
                for (var i = 1; i <= levelOneCounter; i++) {
                    $('.contribution-select').append('<option value=' + window[tempAgentNumber + '_lvl1_soft' + i] + '>' + window[tempAgentNumber + '_lvl1_soft' + i] + '</option>');
                }
            } else if (newSoftLevel == '3') {
                //Populating the select box of level 2 Goal
                $('.contribution-select').empty()
                $('.contribution-select').attr('multiple', 'multiple');
                for (var i = 1; i <= levelTwoCounter; i++) {
                    $('.contribution-select').append('<option value=' + window[tempAgentNumber + '_lvl2_soft' + i] + '>' + window[tempAgentNumber + '_lvl2_soft' + i] + '</option>');
                }
            } 
                //Populating the select box of level 3 Goal
                else {
                    $('.contribution-select').empty()
                    $('.contribution-select').attr('multiple', 'multiple');
                    for (var i = 1; i <= levelThreeCounter; i++) {
                        $('.contribution-select').append('<option value=' + window[tempAgentNumber + '_lvl3_soft' + i] + '>' + window[tempAgentNumber + '_lvl3_soft' + i] + '</option>');
                    }
                }

            }
        }
    );


    $(document).on("click", ".softModal .updateModal", function() {
        var newSoftName = $('.softName').val();
        $('.softItem.active').addClass(newSoftName);
        var newSoftLevel = $('.level-select').val();
        var newAgentName = $('.agent-select').val();
        //SAVING SOFT GOAL AS A VARAIBLE WITH LEVELS
        if (newSoftLevel == '1') {
            levelOneCounter++;
            window[newAgentName + '_lvl' + newSoftLevel + '_soft' + levelOneCounter] = newSoftName;            
        } else if (newSoftLevel == '2') {
            levelTwoCounter++;
            window[newAgentName + '_lvl' + newSoftLevel + '_soft' + levelTwoCounter] = newSoftName;

        } else if (newSoftLevel == '3') {
            levelThreeCounter++;
            window[newAgentName + '_lvl' + newSoftLevel + '_soft' + levelThreeCounter] = newSoftName;
        } else {
            levelLastCounter++;
            window[newAgentName + '_lvl' + newSoftLevel + '_soft' + levelLastCounter] = newSoftName;
            $('.connection-select').append('<option value=' + window[newAgentName + '_lvllast_soft' + levelLastCounter] + '>' + window[newAgentName + '_lvllast_soft' + levelLastCounter] + '</option>');
            var newSoftWeight = $('.softWeight').val();
            if (($('.softItem.active p').length) == 0)
                $('.softItem.active').append('<p>W:<span>' + newSoftWeight + '</span></p>');
            else
                $('.softItem.active p span').html(newSoftWeight);
        }

        $('#modalWindow').modal('hide');
        $('.softItem.active a').html(newSoftName);
        $('.added').removeClass('active');

        // CONNECTION CODEFOR SOFT GOAL
        var softContribution = $('.contribution-select').val();
        var pointOne = newSoftName;
        if ($('.contribution-select option').length > 1) {
            for (var i = 0; i < softContribution.length; i++) {
                if (!($('.connection-style').hasClass(pointOne + "_" + softContribution[i]))) {
                    var leafConnectionValue = $('.soft-select option[value=' + softContribution[i] + ']').text();
                    connect(pointOne, softContribution[i]);
                }
            }
        }
        else {
            connect(pointOne,softContribution);
        }
    });

    $(document).on("click", ".softModal .btnDelete", function() {
        $('#modalWindow').modal('hide');
        $('.workArea .active').remove('.active');
    });


    // OPERATION OPTION CODE
    $(document).on("click", ".added.operationItem", function() {
        $('.added').removeClass('active');
        $(this).addClass('active');
        $('#modalWindow').modal('show');
        $('#modalWindow .modal-content').removeClass('agentModal softModal operationModal connectionModal actorModal');
        $('#modalWindow').find('.modal-content').addClass('operationModal');
    });

    $(document).on("click", ".operationModal .updateModal", function() {
        var tempAgentNumber = $('.agent-select').val();
        var newOperationName = $('.operationName').val();
        $('#modalWindow').modal('hide');
        $('.operationItem.active a').html(newOperationName);
        $('.operationItem.active').addClass(newOperationName);
        $('.added').removeClass('active');

        window[tempAgentNumber + "_operation"+operationCount] = newOperationName;
        var operationConnection = $('.connection-select').val();
        var pointOne = newOperationName;
        for (var i = 0; i < operationConnection.length; i++) {
            if (!($('.connection-style').hasClass(pointOne + "_" + operationConnection[i]))) {
                var leafConnectionValue = $('.soft-select option[value=' + operationConnection[i] + ']').text();
                connect(pointOne, operationConnection[i]);
            }
        }
    });


    $(document).on("click", ".operationModal .btnDelete", function() {
        $('#modalWindow').modal('hide');
        $('.workArea .active').remove('.active');
    });


    // CONNECTION OPTION CODE
    $(document).on("click", ".connection-style", function() {
        $('.added').removeClass('active');
        $(this).addClass('active');
        $("#modalWindow").modal('show');
        $('#modalWindow .modal-content').removeClass('agentModal softModal operationModal connectionModal actorModal');
        $('#modalWindow').find('.modal-content').addClass('connectionModal');
    });

    $(document).on("click", ".connectionModal .updateModal", function() {
        var newConnectionValue = $('.connectionValue').val();
        $('#modalWindow').modal('hide');
        $('.active').css('z-index', '-100');
        $('.active').append("<div><p>" + newConnectionValue + "</p></div>")
        var connectionClass = $('.active').attr('class').split(' ')[0];
        connection[connectionCounter] = connectionClass;
        connectionValue[connectionCounter] = newConnectionValue; 
        connectionCounter ++
        console.log(connection);
        console.log(connectionValue);   
        $('.connection-style').removeClass('active');

    });

    $(document).on("click", ".connectionModal .btnDelete", function() {
        $('#modalWindow').modal('hide');
        $('.workArea .active').remove('.active');
    });


    // CONNECTION CODE
    function connect(one, two) {
        oneConnect = "." + one;
        twoConnect = "." + two;
        $(oneConnect).connections({
            to: twoConnect,
            class: one + '_' + two + ' connection-style '
        });
    }


    //****************************** LOGIC *******************************//


    $('.calculateBtn').click(function() {

        // $('.added').removeClass('active');
        // $(this).addClass('active');
        $("#modalWindow").modal('show');
        $('#modalWindow .modal-content').removeClass('agentModal softModal operationModal connectionModal actorModal');
        $('#modalWindow').find('.modal-content').addClass('actorModal');

    });


    $(document).on("click", ".actorModal .updateModal", function() {
        var selectedActor = $('.actor-select').val();;
        $('#modalWindow').modal('hide');


        calculateActor(selectedActor);


    });


    function calculateActor(value) {

        var actorArray = value;
        var totalOperations = (Object.keys(jsObj[actorArray].operation).length);
        var totalGoal = (Object.keys(jsObj[actorArray].mainGoal).length)
        var operationScore = new Array(totalOperations).fill(0);
        var bestContribution = new Array(totalGoal).fill(0);
        var goalContribution = new Array(totalGoal).fill(0);
        var goalConnection = new Array(totalGoal).fill(0);
        var bestOperation;
        var preGoalScore = 0;
        var goalScore;

        for (var i = 0; i < (Object.keys(jsObj[actorArray].operation).length); i++) {

            var operation = jsObj[actorArray].operation[i];
            Object.keys(jsObj[actorArray].mainGoal).forEach(function(key, idx) {

                var systemPlanWeight = jsObj[actorArray].mainGoal[key];
                var systemPlan = key
                var connectionSyntax = operation + '_' + systemPlan;
                operationScore[i] += ((systemPlanWeight) * (jsObj[actorArray].connections[connectionSyntax]));
            });
        }
        console.log(operationScore);

        bestOperation = jsObj[actorArray].operation[(operationScore.indexOf(Math.max.apply(window, operationScore)))]
        console.log(bestOperation)

        $("." + bestOperation).addClass('chosen');
        alert("Best Operation is " + bestOperation);


        bestOperationScore = (Math.max.apply(window, operationScore)).toFixed(2);
        console.log(bestOperationScore);
        var count = 0;
        var dependancy = false;
        Object.keys(jsObj[actorArray].mainGoal).forEach(function(key, idx) {

            var systemPlanWeight = jsObj[actorArray].mainGoal[key];
            console.log(systemPlanWeight);
            var systemPlan = key
            console.log(systemPlan);

            var systemPlanCompare = systemPlan.toLowerCase();

            if ($(systemPlanCompare).length > 0) {
                dependancy = true;
                equalCount = count;
                connect(systemPlanCompare, systemPlan);
            }


            var connectionSyntax = bestOperation + '_' + systemPlan;
            bestContribution[count] = jsObj[actorArray].connections[connectionSyntax];
            count++;
        });
        //    console.log(bestContribution);

        if (!dependancy) {
            for (var i = 0; i < totalGoal; i++) {
                goalContribution[i] = (Math.max(Math.min((bestOperationScore * bestContribution[i]), 1), -1)).toFixed(2);

            }
        } else {
            for (var i = 0; i < totalGoal; i++) {
                if (equalCount == i) {
                    goalContribution[i] = (Math.max(Math.min(((bestOperationScore * bestContribution[i]) + contributionValue), 1), -1)).toFixed(2);
                    contributionValue += goalContribution[i]
                } else {
                    goalContribution[i] = (Math.max(Math.min((bestOperationScore * bestContribution[i]), 1), -1)).toFixed(2);
                }
            }
        }


        //    console.log(goalContribution);

        var mainGoalActor = jsObj[actorArray].goal;
        var count = 0;
        Object.keys(jsObj[actorArray].mainGoal).forEach(function(key, idx) {

            var systemPlanWeight = jsObj[actorArray].mainGoal[key];
            var systemPlan = key
            var connectionSyntax = systemPlan + '_' + mainGoalActor;
            goalConnection[count] = (jsObj[actorArray].connections[connectionSyntax]);
            count++;
        });
        console.log(goalConnection);

        for (var i = 0; i < totalGoal; i++) {
            preGoalScore += goalContribution[i] * goalConnection[i]
        }
        //  console.log(preGoalScore);

        var finalScore = Math.max(Math.min(preGoalScore), 1, -1);
        console.log(preGoalScore);

    }
})