#  Invoke-Sqlcmd :: https://learn.microsoft.com/en-us/powershell/module/sqlserver/invoke-sqlcmd?view=sqlserver-ps
#  Export-Csv :: https://learn.microsoft.com/en-gb/powershell/module/microsoft.powershell.utility/export-csv?view=powershell-7.2  


For ($i=2000; $i -le 2020; $i++) {

    Invoke-Sqlcmd -Query "SELECT r.ref_key
         , g.fiscal_year
         , FORMAT(min(g.[date]),'yyyy-MM-dd') [first_mf_gift_date]              
         , month(dateadd(month,7,min(g.[date]))) [first_mf_gift_month_id]     
      from build.rpts_record r
      join build.rpts_gift_donor gd on r.id = gd.record
      join build.rpts_gift g on g.guid = gd.gift
    where 1=1
      and g.is_cash_in = 1
      and g.is_mac_fund = 1
        and g.fiscal_year = $i
    group by r.ref_key, r.name, g.fiscal_year" `
    -ServerInstance "sql.technolutions.net,1442" -Database "mad" `
    -Username "slate_mad_advcs" -Password "DIRECT_CONNECT_SQL_PASSWORD" | `
    Export-Csv -NoTypeInformation -Path ".\output\YearlySummary-$i.csv"  -UseQuotes AsNeeded 
    
}
