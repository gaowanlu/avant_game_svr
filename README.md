# avant_game_svr

game server framework in avant framework https://github.com/mfavant/avant

## 各进程准备计划

1. MapSvr 游戏服 1.1.1.1
    
玩家对象 与 地图对象都在上面

2. ConnSvr 网关 1.1.2.1
    
客户端只与网关连接

3. DbSvr 数据库操作 1.1.3.1
    
游戏服保存数据 加载输出与DbSvr通信，可以用Go来写比较方便

4. WebSvr Web服务器 1.0.4.1
    
客户端可以直接与Web服务器通信  
登录鉴权也走Web服务器  
Web服务器与MapSvr通信  

5. GodSvr 上帝视角全局服务器 1.0.5.1

如登录 WebSvr GodSvr MapSvr 之间配合  
同一个游戏账号只能在线一个玩家  
在线就要顶掉 鉴权由WebSvr和MapSvr之间通信来做  

```bash
________________________________________________________________________
  玩家客户端    |                        服务器
________________|_______________________________________________________
                 
      <-------------------------------->WebSvr(Node.js)<----------->
      |                                    |                       |
      |                                    |<---->GodSvr(Lua)     DataBase
      |                                    |                      Redis\Postgres\MongoDB
      |                                    |                       |
Client<---------------->ConnSvr(Lua)<--->MapSvr(Lua)<----------->DbSvr(Go)

_________________________________________________________________________

```

