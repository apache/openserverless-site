---
title: config
---


  `ops config`


```Usage:
  config (enable|disable) [--all] [--redis] [--mongodb] [--minio] [--cron] [--static] [--postgres] [--prometheus] [--slack] [--mail] [--affinity] [--tolerations] [--quota]  
  config apihost (<apihost>|auto) [--tls=<email>] [--protocol=<http/https>|auto]
  config runtimes [<runtimesjson>]  
  config slack [--apiurl=<slackapiurl>] [--channel=<slackchannel>]
  config mail  [--mailuser=<mailuser>] [--mailpwd=<mailpwd>] [--mailfrom=<mailfrom>] [--mailto=<mailto>]
  config volumes [--couchdb=<couchdb>] [--kafka=<kafka>] [--pgvol=<postgres>] [--storage=<storage>] [--alerting=<alerting>] [--zookeeper=<zookeeper>] [--redisvol=<redis>] [--mongogb=<mongodb>]
  config controller [--javaopts=<javaopts>] [--loglevel=<loglevel>] [--replicas=<replicas>]
  config invoker [--javaopts=<javaopts>] [--poolmemory=<poolmemory>] [--timeoutsrun=<timeoutsrun>] [--timeoutslogs=<timeoutslogs>] [--loglevel=<loglevel>] [--replicas=<replicas>]
  config limits [--time=<time>] [--memory=<memory>] [--sequencelength=<sequencelength>] [--perminute=<perminute>] [--concurrent=<concurrent>] [--triggerperminute=<triggerperminute>] [--activation_max_payload=<activation_max_payload>]
  config storage [--class=<storage_class>] [--provisioner=<storage_provisioner>]
  config postgres [--failover] [--backup] [--schedule=<cron_expression>] [--replicas=<replicas>]
  config minio [--s3] [--console]  
  config aws [--access=<access>] [--secret=<secret>] [--region=<region>] [--image=<image>] [--vm=<vm>] [--vmuser=<vmuser>] [--disk=<disk>] [--key=<key>] 
  config eks [--access=<access>] [--secret=<secret>] [--region=<region>] [--name=<name>] [--count=<count>] [--vm=<vm>] [--disk=<disk>] [--key=<key>] [--kubever=<kubever>]
  config gcloud [--project=<project>] [--region=<region>] [--vm=<vm>] [--disk=<disk>] [--key=<key>] [--image=<image>]
  config gke [--name=<name>] [--project=<project>] [--region=<region>] [--count=<count>] [--vm=<vm>] [--disk=<disk>]
  config aks [--name=<name>] [--region=<region>] [--count=<count>]  [--vm=<vm>] [--disk=<disk>] [--key=<key>]
  config (status|export|reset)
  config use [<n>] [--delete] [--rename=<rename>]
  config minimal  
```

```
  config apihost          configure the apihost (auto: auto assign) and enable tls
  config runtime          show the current runtime.json or import the <runtime-json> if provided
  config enable           enable OpenServerless services to install
  config disable          disable OpenServerless services to install
  config slack            configure Alert Manager over a given slack channel
  config mail             configure Alert Manager over a gmail account
  config volumes          configure the volume size distinguished in 3 categories (openwhisk couchdb & kafka, database, minio storage, alerting)
  config controller       configure Openwhisk enterprise controller java options
  config invoker          configure Openwhisk enterprise invoker options
  config limits           configure Openwhisk actions limits
  config storage          allows to customize storage persistence class and provider
  config postgres         allows to customize enterprise options for nuvolaris default postgres deployment  
  config aws              configure Amazon Web Service (AWS) credentials and parameters
  config gcloud           configure Google Cloud credentials and parameters
  config eks              configure Amazon EKS Kubernetes Cluster
  config aks              configure Azure AKS Kubernetest Cluster
  config gke              configure Google Cloud GKE Kubernetest Cluster
  config reset            reset configuration
  config status           show current configuration
  config export           export all the variables
  config use              use a different kubernetes cluster among those you created
  config minimal          shortcut for ops config enabling only redis,mongodb,minio,cron,static,postgres
```

```
  --all                 select all services
  --redis               select redis
  --mongodb             select mongodb (FerretDB Proxy)
  --minio               select minio
  --cron                select cron
  --static              select static
  --postgres            select postgres
  --tls=<email>         enable tls with let's encrypt, contact email required
  --access=<access>     specify access key
  --secret=<secret>     specify secret key  
  --name=<name>         specify name
  --region=<region>     specify region (AWS) location (Azure) or zone (GKE)
  --count=<count>       specify node count
  --vm=<vm>             specify vm type
  --disk=<disk>         specify disk size
  --key=<key>           specify ssh key name
  --kubever=<kubever>   specify kubernetes version
  --delete              delete the selected kubeconfig
  --image=<image>       specify gcp image type (default to ubuntu-minimal-2204-lts. Passing ubuntu-minimal-2204-lts-arm64 will create ARM based VM)
  --prometheus          select monitoring via Prometheus
  --slack               select alert manager module over slack channel
  --mail                select alert manager module over mail channel using a gmail account
  --affinity            select pod affinity for multinode enterprise deployment. In such case load will be splitted between node labeled with nuvolaris-role in core or invoker
  --tolerations         select pod tolerations for multinode enterprise deployment.
  --failover            select failover support on components supporting it as postgres
  --backup              select automatic backup on components support it as postgres
  --s3                  activate s3 compatible ingress on components supporting it
  --console             activate a s3console ingress on components supporting it (Currently MINIO)
  --quota               select quota checker module
```