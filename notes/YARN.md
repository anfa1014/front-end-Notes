## Yarn
与npm一样，Yarn是一个JavaScript包管理工具，由Facebook、Google、Exponent 和 Tilde 联合推出。Yarn的出现是为了弥补npm自身的不足,并不是完全替代npm，拉取packages依然来自npm仓库。仓库本身不会变，所以获取或发布的模块的时候和原来一样。
## 差异性
先说一下npm的缺点，大致如下：

* 即使使用相同的package.json，在不同的设备上拉取的packages版本是不一样的，这就可能引起某些bug

* install时间较长。在安装packages时，npm是按照package的顺序进行安装，必须等到当前package安装成功之后，才能继续安装。

然而Yarn的明显优点如下：

* 存在一个锁定文件(yarn.lock）记录被确切安装上的模块的版本号，用于防止拉取到不同的版本。每次只要新增一个模块，Yarn就会创建或者更新该文件。

* Yarn是同步执行所有任务，所以安装时间明显缩短。以下是网上大牛们做的实验：
	> 拉取express依赖，一共安装了42个依赖，npm耗时9秒，Yarn耗时1.37秒
	
* 更简洁的输出


实际上，npm通过shrinkwrap命令也可以生成一个npm-shrinkwrap.json锁定文件，只有当这个文件存在时，packages 版本信息才会被记录和更新。(Yarn是默认生成)

## 安装（macOS）
通过[Homebrew包管理工具](https://brew.sh/)安装Yarn,如果没有安装Node.js也可以安装
> brew install yarn 

## 使用 
* yarn:会优先安装 yarn.lock 中记录的依赖，没有这样的锁定文件时，才会去安装 package.json 中的依赖。 

* yarn add [package]:与npm install [package]类似


* yarn remove [package]: 与npm uninstall [package]类似
* yarn licenses [ls|generate-disclaimer]
	* yarn licenses ls 用于罗列出所有被安装的 package 所持有的执照情况
	* yarn licenses generate-disclaimer 将生成一个对所有依赖的免责声明。 

## 从 npm 迁移到 Yarn
从npm迁移到Yarn很easy, 只需要运行yarn命令就OK,Yarn 将通过自己的解析算法来重新组织 node_modules目录，这个算法和Node.js模块解析算法是兼容的。


## 参考
* [Yarn vs npm：你需要知道的一切](https://zhuanlan.zhihu.com/p/23493436)
* [Migrating from npm](https://yarnpkg.com/en/docs/migrating-from-npm)