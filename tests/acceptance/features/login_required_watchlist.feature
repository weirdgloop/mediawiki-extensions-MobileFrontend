@user_agent
Feature: Login required for Uploads

  Scenario:
    Given that I am using Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
    When I select Watchlist
    Then I receive watchlist message Please log in to view or edit items on your watchlist.


