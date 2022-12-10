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
                item["marcket"] = gameinfor[1].trim();
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
                item["marcket"] = gameinfor[1].trim();
                item["place"] = $(this).find(".selection.title-tooltip").text().trim();
                item["odds"] = $(this).find(".odds").text().trim();
                item["stake"] = $(this).find(".input-stake.stake.risk").val().trim();
                item["wins"] = $(this).find(".input-stake.stake.win").val().trim();
                item["site"] = "bet487.org";

                senddata.push(item);
            })
        }

        if (site.search("sports411.ag") != -1) {
            $(".d-flex.justify-content-around.ng-star-inserted.selected, .d-flex.justify-content-around.align-internal-elements.ng-star-inserted.selected").each(function () {
                var betinfor = $(this).find("input");
                var betid = betinfor.attr("id");
                var leagueid = betinfor.attr("idleague");
                var odds = betinfor.attr("odds");
                var idgame = betinfor.attr("idgame");
                var marcket;

                if (betinfor.attr("linetype") === "odds")
                    marcket = "money line";
                else
                    marcket = betinfor.attr("linetype");

                var currentYear = (new Date).getFullYear();
                var gameinfor = $(`[idgame = ${idgame}]`);
                var team1 = gameinfor.find(".visitor").text().trim();
                var team2 = gameinfor.find(".home").text().trim();

                var gameday = gameinfor.find(".ng-star-inserted:first").text();
                var gamedate;

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
                    gamedate = gamedate.slice(0, 8).trim();
                }

                var leagueinfor = $(`[id = league_${leagueid}]`).closest("[data-parent = #leagues]").attr("id");
                var match = $(`[aria-controls = ${leagueinfor}]`).attr("cat").trim();

                var stake = $(`#risk_${betid}`).val().trim();
                var wins = $(`#win_${betid}`).val().trim();

                var place = $(`#risk_${betid}`).closest(".bet-content.row.no-gutters.ng-star-inserted").find(".team-name").text().trim();

                item = {};
                item["gamedate"] = gamedate;
                item["game"] = match;
                item["team1"] = team1;
                item["team2"] = team2;
                item["marcket"] = marcket;
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
        $.ajax({
            type: 'POST',
            url: "https://betmlb.me/betting",
            data: JSON.stringify(senddata),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
            },
        })
    });
});

