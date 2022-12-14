$(document).on("ready", function () {
    var site = window.location.href;
    var buttonclass;
    var senddata = [];

    if (site.search("ps3838.com") != -1)
        buttonclass = ".place-bet-btn";
    else if (site.search("bet487.org") != -1)
        buttonclass = ".place-bet-btn";
    else if (site.search("sports411.ag") != -1)
        buttonclass = ".btn.btn-primary.btn-lg.btn-block.ng-star-inserted";
    else
        buttonclass = "#####"

    $(document).on('mouseover', `${buttonclass}`, function (event) {
        senddata = [];
        if (site.search("ps3838.com") != -1) {
            $(".bet-body-item").each(function () {
                var gametype = $(this).find(".bet-extra-info.title-tooltip").text();
                var gameinfor = gametype.split(" ");

                item = {};
                item["gamedate"] = gameinfor[0].trim();
                addy = $("#oddspage").find(".title").text().trim();
                item["game"] = addy.substr(0, addy.indexOf('-')).trim();

                item["team1"] = $(this).find(".team1").text().trim();
                item["team2"] = $(this).find(".team2").text().trim();

                if(item["team1"].length == 0 || item["team2"].length == 0){
                    item["team1"] = $(this).find(".bet-event.title-tooltip").text().trim();
                    item["team2"] = $(this).find(".bet-event.title-tooltip").text().trim();
                }

                if(item["team1"].length == 0 || item["team2"].length == 0){
                    item["team1"] = $(this).find(".special-name").text().trim();
                    item["team2"] = $(this).find(".special-name").text().trim();
                }

                item["market"] = gameinfor[1].trim();
                item["place"] = $(this).find(".selection.title-tooltip").text().trim();
                item["odds"] = $(this).find(".odds").text().trim();
                item["stake"] = $(this).find(".input-stake.stake.risk").val().trim();
                item["wins"] = $(this).find(".input-stake.stake.win").val().trim();
                item["site"] = "ps3838.com";

                senddata.push(item);
            })
        }

        if (site.search("bet487.org") != -1) {
            $(".bet-body-item").each(function () {
                var gametype = $(this).find(".bet-extra-info.title-tooltip").text();
                var gameinfor = gametype.split(" ");

                item = {};
                item["gamedate"] = gameinfor[0].trim();
                addy = $("#oddspage").find(".title").text().trim();
                item["game"] = addy.substr(0, addy.indexOf('-')).trim();
                item["team1"] = $(this).find(".team1").text().trim();
                item["team2"] = $(this).find(".team2").text().trim();

                if(item["team1"].length == 0 || item["team2"].length == 0){
                    item["team1"] = $(this).find(".bet-event.title-tooltip").text().trim();
                    item["team2"] = $(this).find(".bet-event.title-tooltip").text().trim();
                }

                item["market"] = gameinfor[1].trim();
                item["place"] = $(this).find(".selection.title-tooltip").text().trim();
                item["odds"] = $(this).find(".odds").text().trim();
                item["stake"] = $(this).find(".input-stake.stake.risk").val().trim();
                item["wins"] = $(this).find(".input-stake.stake.win").val().trim();
                item["site"] = "bet487.org";

                senddata.push(item);
            })
        }
        if (site.search("sports411.ag") != -1) {
            $(".d-flex.justify-content-around.ng-star-inserted.selected, .d-flex.justify-content-around.align-internal-elements.ng-star-inserted.selected, .d-flex.justify-content-between.ng-star-inserted.selected").each(function () {
                var betinfor = $(this).find("input");
                var betid = betinfor.attr("id");
                var leagueid = betinfor.attr("idleague");
                var odds = betinfor.attr("odds");
                var idgame = betinfor.attr("idgame");
                var macket, team1, team2, match, stake,wins,place, gamedate;
                
                if(leagueid == 0){
                    team1 = $(this).closest("app-schedule-game-american").find(".sports-league-description.tnt.ng-star-inserted").first().text().trim();
                    team2 = team1;
                    place = betinfor.attr("team").trim();
                    match = $(this).closest("app-schedule-dategroup").find(".sports-league-banner.ng-star-inserted").find("a").text().trim();
                    
                    if ($(this).closest("app-schedule-game-american").find(".sports-league-description.tnt.ng-star-inserted").length == 1 )
                       market = team1;
                    else
                       market = $(this).closest("app-schedule-game-american").find(".sports-league-description.tnt.ng-star-inserted").first().next().text().trim();

                    var tempdate = match.split("-");
                    var tmp1 = tempdate[tempdate.length-1].trim();
                    var tmp2= tmp1.split(" ");
                    var months = {"JAN":"01", "FEV":"02", "MAR":"03", "APR":"04", "MAY":"05", "JUN":"06", "JUL":"07", "AUG":"08", "SEP":"09","OCT":"10" ,"NOV":"11", "DEC":"12"};
                    var month;

                    var d = new Date();
                    n = d.getMonth() + 1;
                    y = d.getFullYear();

                    for( let key in months ) {
                        if(key == tmp2[0].trim())
                            month = months[key];
                      }
                    
                    if(parseInt(month) < n)
                      y = y + 1;

                    gamedate = y.toString() + "-" + month + "-" + tmp2[1].trim();
                }
                else
                {
                    if (betinfor.attr("linetype") === "odds")
                        market = "money line";
                    else
                        market = betinfor.attr("linetype");

                    var currentYear = (new Date).getFullYear();
                    var gameinfor = $(`[idgame = ${idgame}]`);
                    team1 = gameinfor.find(".visitor").text().trim();
                    team2 = gameinfor.find(".home").text().trim();

                    var gameday = gameinfor.find(".ng-star-inserted:first").text();

                    if (gameday.search("LIVE") != -1) {
                        var mm = (new Date).getMonth() + 1; // getMonth() is zero-based
                        var dd = (new Date).getDate();

                        gamedate = [(new Date).getFullYear(), "-",
                        (mm > 9 ? '' : '0') + mm, "-",
                        (dd > 9 ? '' : '0') + dd
                        ].join('');
                    }
                    else {
                        var daydata = gameday.split("/");
                        gamedate = `${currentYear}-${daydata[0]}-${daydata[1]}`;
                        gamedate = gamedate.slice(0, 10).trim();
                    }

                    var leagueinfor = $(`[id = league_${leagueid}]`).closest("[data-parent = #leagues]").attr("id");
                    match = $(`[aria-controls = ${leagueinfor}]`).attr("cat").trim();

                    place = $(`#risk_${betid}`).closest(".bet-content.row.no-gutters.ng-star-inserted").find(".team-name").text().trim();
                }

                stake = $(`#risk_${betid}`).val().trim();
                wins = $(`#win_${betid}`).val().trim();

                item = {};
                item["gamedate"] = gamedate;
                item["game"] = match;
                item["team1"] = team1;
                item["team2"] = team2;
                item["market"] = market;
                item["place"] = place;
                item["odds"] = odds;
                item["stake"] = stake;
                item["wins"] = wins;
                item["site"] = "sports411.ag";

                senddata.push(item);
            })
        }
    });

    if (site.search("ps3838.com") != -1)
        buttonclass = ".okBtn";
    else if (site.search("bet487.org") != -1)
        buttonclass = ".okBtn";
    else if (site.search("sports411.ag") != -1)
        buttonclass = ".btn.btn-primary.btn-lg.btn-block.ng-star-inserted";
    else
        buttonclass = "#####"

    $(document).on('click', `${buttonclass}`, function (event) {
        if(buttonclass == ".okBtn"){
            if($(this).closest(".AlertComponent.undefined.confirm-alert").attr("class") != null)
                {
                    // alert(JSON.stringify(senddata))
                    $.ajax({
                        type: 'POST',
                        url: "https://betmlb.me/betting",
                        data: JSON.stringify(senddata),
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function(data){
                        },
                    })
                }
            }
        else{
            // alert(JSON.stringify(senddata))
            $.ajax({
                type: 'POST',
                url: "https://betmlb.me/betting",
                data: JSON.stringify(senddata),
                contentType: 'application/json',
                dataType: 'json',
                success: function(data){
                },
            })
        }   
    });
});

