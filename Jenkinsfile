import java.text.SimpleDateFormat

node(){
    def dateFormat = new SimpleDateFormat("yyyyMMddHHmm")
    def dockerTag = dateFormat.format(new Date())
    def dockerName='ci_test'

    stage('get souce code') {
        try {
            echo "get source code"
            checkout scm
        }
        catch(err) {
            echo "get source code failed"
            throw err
        }
    }
     stage('npm run build') {
        try{
        // 运行容器实例的时候，我们已经把宿主机的docker命令映射到了容器里，所以能够直接调用docker
        // 利用镜像构建node环境并打包，运行完则退出
            docker.image('node:12-alpine').inside {
                sh 'node --version'
                sh 'npm --version'
                sh "npm --registry https://registry.npm.taobao.org install"
                sh 'npm install'
                sh 'npm run build'
            }
            }
        catch(err){
                echo "npm run build failed"
                throw err
            }
    }

    stage('deploy with nginx') {
            try {
                sh 'pwd'
                sh 'ls'
                // 项目打包到了dist文件夹，需要复制到devops_build文件夹下，devops_build需要手动创建，作用在后面
                sh 'cp -r dist ./devops_build'

                // 删除旧版本，代码会发布无数次，所以需要删除旧版本
                sh "docker rm -f ${dockerName}"
                // 创建nginx镜像，工作目录为devops_build，配置文件为Dockerfile
                sh "docker build --no-cache=true -t ${dockerName}:${dockerTag} ./devops_build"

                // 运行nginx实例并映射80端口到宿主机
                sh "docker run -u root --name ${dockerName} -p 80:80 -it -d ${dockerName}:${dockerTag}"

                // 只保留最新的三个镜像
                sh """docker rmi -f \$(docker images | grep ${dockerName} | sed -n  '4,\$p' | awk '{print \$3}') || true"""
            }
            catch(err){
                    echo "deploy with Nginx failed"
                    throw err
                }
        }

}

