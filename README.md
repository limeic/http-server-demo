# http demo server

用于演示 Gateway 与 http server 进行通信

### 接口说明

#### GetPing

接收Gateway的Ping请求，并回复收到的内容

- URL

/ping?data=

- Method

Get

- Parameter

data: 数据

#### PostPing

接收Gateway的Ping请求，并回复收到的内容

- URL

/ping

- Method

Post

- Body

JSON格式的数据
{
    ...
}

#### Broadcast

- URL

broadcast

- Method

Post

- Body

JSON格式的数据
{
    userId: "", 指定UserId进行broadcast
    ...
}

