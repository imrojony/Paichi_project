bindu new  --app Blank --port 8080 #true
bindu generate Help #true
bindu generate Scaffold User Email:String UserName:String Phone:String --hasOne Profile #false
bindu generate Scaffold User Email:String UserName:String Phone:String --hasOne Profile #false
bindu generate Controller Profile FirstName:String LastName:String Image:String #true
bindu generate Controller Profile FirstName:String LastName:String Image:String #false
bindu generate Model Profile FirstName:String LastName:String Image:String #false
bindu generate Model Profile FirstName:String LastName:String Image:String #false
bindu db Migrate #true
bindu generate Scaffold Item Location:String Type:String Image:String Title:String Date:String #true
bindu generate Model User --hasMany Item #false
bindu db Migrate #true
bindu generate Model User --hasMany Item #false
bindu db Migrate #true
bindu create User Username:Sohag Password:11111 Role:Admin #true
bindu generate Routes User --middleware auth --group v1 #true
bindu generate Routes Item --middleware auth --group v1 #true
bindu generate Controller User #false
bindu generate Controller User #false
bindu create Policy Alice:P Sub:Admin Obj:/Api/* Act:* #true
bindu generate Scaffold Blog Title:String Description:String --hasMany Comment --belongsTo User #true
bindu generate Scaffold Comment Subject:String Body:String #true
bindu db Migrate #true
bindu generate Scaffold Contact FirstName:String LastName:String Subject:String Description:String #true
bindu generate Model Item Description:String #false
bindu db Migrate #true
bindu generate Model Item Mobile:String #false
bindu db Migrate #true
bindu create Policy Alice:P Sub:Subscriber Obj:/Api/V1/* Act:* #true
bindu db Migrate #true
bindu create User Username:Sohag Password:11111 Role:Admin #true
bindu db Migrate #true
bindu create User Username:Sohag Password:11111 Role:Admin #true
bindu db Migrate #true
bindu create Policy Alice:P Sub:Subscriber Obj:/Api/V1/* Act:* #true
bindu db Migrate #true
bindu create User Username:Sohag Password:11111 Role:Admin #true
bindu create Policy Alice:P Sub:Admin Obj:/Api/* Act:* #true
bindu create User Username:Sohag Password:11111 Role:Admin #true
bindu db Migrate #true
bindu create User Username:Sohag Password:11111 Role:Admin #true
bindu db Migrate #true
bindu create User Username:Sohag Password:11111 Role:Admin #true
bindu generate Routes Comment --middleware auth --group v1 #true
bindu db Migrate #true
bindu db Migrate #true
bindu db Migrate #true
bindu generate Routes Contact --middleware auth --group v1 #true
bindu db migrate # ^>false: DB Migration Faileddb/migrations/migrate2020December15-303087033.go<^
bindu db migrate # ^>false: DB Migration Faileddb/migrations/migrate2020December15-779521283.go<^
bindu db migrate migrate2020December15-779521283.go # ^>false: DB Migration Faileddb/migrations/migrate2020December15-892061633.go<^
bindu db migrate –db paichi –table item # ^>false: DB Migration Faileddb/migrations/migrate2020December15-496836302.go<^ 
