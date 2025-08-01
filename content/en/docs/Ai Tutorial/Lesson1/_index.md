---
title: Lesson 1
weight: 10
draft: true
---
## Lesson 1
transcript here:
0:00
hello everyone to access the lesson after starting the environment and after
0:06
configuring it you must be logged in the first step is to select here the first
0:12
lesson which is the one that we are about to see and here all the files of
0:17
the lesson are downloaded if we go and see now the files you see that there is
0:22
a new lesson that we can open and we can do the preview of this and this is the
0:28
new lesson here then this is the first real lesson of the course while what you
0:35
have already seen was lesson zero which explains how to configure the
0:39
environment now let's talk about the integrated services who are supplied
0:46
with the system and we show you some examples which we call hello exercising
0:53
the various services available and these are useful both as a code example that
0:58
one can look at to try out the various services are useful in themselves
1:02
because they are used for example for debugging for interact with the cache
1:08
with the database and to do tests so the first step is to see these
1:12
examples then I'll show you the tool command line that are even more useful
1:18
because when you work you use them extensively and so we'll end the second
1:23
module then the third module is that of the exercise in which I show you step by
1:30
step how implement a simple service which in this case will not use LLMs but
1:37
it is still used for variations with the environment and it is the exercise that
1:43
we will ask you to do even with some modifications in the exercise and so we
1:49
complete the lesson well let's proceed downloading the lesson a hello package
1:55
was downloaded this package contains all the various examples so an example to
2:02
exercise the cache that is Redis an example to exercise the store that is
2:08
Milvus the database an example to exercise streaming and an example to exercise the
2:15
LLM which is Ollama etc and there are also two tests trivial ones that fail that
2:21
serve to try to correct them and check if the testing system works therefore
2:28
after downloading if you go to see the tests and eventually it may take a
2:34
refresh to see them if you don't see them here they are you see these are all
2:38
the tests we launch them and verify that all services work so now let's check
2:44
that everything goes the two tests deliberately fail precisely to verify
2:49
that everything works then check that everything works by failing some tests
2:54
and then correcting it okay here all the tests work except the two that we have
3:00
deliberately left broken so the first exercise you should do too we'll correct
3:05
the tests then let's go to look for the string to do that says where and we find
3:12
here the wrong test the output should be hello and the string hi so I suppose it
3:20
is understood that it is not this so we change the string and save it now notice
3:26
this if I now perform the test happen that one passes by and is the test
3:34
unitary because the unitary test it only requires the code but the integration
3:40
test that requires deployment on the system does not pass because we have not
3:45
deployed it so what we have to do is go here and do the
3:52
deploy and at this point the integration test should also pass so we deploy what
3:58
now the integration test also passes so so there is practice with the test
4:04
performer in general it is better put develop mode devel so the development
4:11
mode has the advantage that it immediately deploys the code as soon as
4:16
you change it and we will see this when we do the actual exercise so now let's
4:22
move on let's see the examples we deployed together with the test also all
4:28
the examples that we can go to see so when you do the deploy it also tells you
4:33
the URL of where the environment is in production so each of you will have a
4:39
different access so he deployed on the environment and you will have to use the
4:45
password that you have put before and that I changed that's it good now there
4:52
are new services stream Redis and now we see them one by one so
4:59
we realize what is available in the environment so first of all there is
5:06
obviously the LLM since this is a private AI development course we will
5:12
use Ollama where we deployed the llama model 3.18 billions but you will find
5:19
that it is very powerful in fact it is remarkable what it can do and is
5:24
sufficient for for the course objectives we'll actually also use a vision model
5:29
for image recognition and an embed model to do the ending that is used for the ra
5:35
these are things that we will address during the course so if we click on Ollama
5:41
here gives us a welcome message i ask him who are you here's his answer he
5:48
says he's an artificial intelligence i can also ask questions in Italian what
5:54
is the capital of Italy it is an absolutely remarkable model for
5:59
what it manages to do however small because it is performed on a small GPU
6:05
that costs quite little yet it really does so much in fact the course will
6:11
purely use this model although nothing prevents you from using other larger
6:16
ones and even connect to AI such as OpenAI Claude etc if you go and see the
6:22
code you will also see the code of the LLM which is of devastating simplicity
6:27
so this is all you need to connect moving on then the next thing to test is
6:33
the streamer here if I write to him hi how are you it does the streaming that
6:41
is it basically takes the string it sends and it tells you the ASCI
6:46
characters separating them 1 second from each other to demonstrate how streaming
6:51
works so we also have streaming support we will see it this one too in the next
6:58
lessons here too you can look at the code to understand how streaming works
7:04
now let's see the cache redis works with commands so the logical thing was
7:10
to select redis and be able to talk to him so for example I can ask info and
7:17
gives me all the info or I can ask for the keys that are available and shows
7:21
them to me etc it's okay then moving on the next step is file storage then so
7:30
this is called S3 but this is not Amazon's S3 that's embedded in
7:36
Nuvolaris so this is to list the files that are in the storage i can also
7:41
create one plus hello equal world here you see now I can also list by substring
7:48
and I can also delete them or upload like this i now take a file and I upload
7:55
it and so if I now make star here it is it has arrived i did the upload then of
8:02
course once uploaded move on to the LLM to process it then last but not least is
8:08
the vector database the vector database is what you need to insert the documents
8:15
in our case Milvus therefore I simply write a few things for example asterisk
8:21
test and I look for everything that uses test obviously first I have to insert
8:27
some texts so this is a test test this is another test i am testing the system
8:37
okay now if I do the search with an asterisk test will look for me tests in
8:43
order of distance which is an essential concept for research vector which is
8:48
practically used to find in documents of the phrases relevant to what you are
8:53
asking so this concept of vector search is essential this allows you to test so
9:00
you are telling me that if I search for the word test I found some phrases of
9:05
which the first is the closest to all so it's a kind of search for relevance that
9:10
however with LLMs is done in a particular way using a technique called
9:15
embedding which we will discuss in detail in the lesson relevant hour so
9:22
far we have seen the user interface and now let's talk about the command line
9:26
tools so there are many command line tools they are all documented and the
9:32
tool is called ops here there is explained everything he does there is
9:38
also the reference of all the components that there are which are available
9:44
therefore our divisions into tools and tasks the tools begin with the hyphen
9:50
and the tasks on the other hand are the things that are normally used of the
9:55
many available we will basically focus on IDE tasks and on AI tasks basically a
10:03
subcommand that has many subcomands therefore here we take an
10:08
example how ops works creating an action and then and
10:14
then removing it so practice I repeat by hand what we did with the extension and
10:20
so you better understand how it works take lesson one and I perform this piece
10:26
of code instead of copying it I run it directly from the example now I'm going
10:32
to give you an introduction to the main commands of ops the first ops action
10:37
list is used to list the actions which are the functions the components of our
10:43
applications then we can create an action i have here added a simple
10:48
example action of a single file usually the actions we use are many when it is a
10:54
single file you have to package it but this is done by the other tools when you
10:59
have an action of only one file you can create it on the fly you can invoke it
11:04
with an input you can get a URL by default the action it is so if you try
11:11
to use it you will get an error requires permission but you can make it public
11:17
then you can make an update and put a parameter on it so this made it public
11:22
now we get a URL now we can invoke it directly and pass parameters directly to
11:28
it using curl etc and finally the possible delete delete and now we see
11:34
that it is no longer there okay all right this is to give you an idea of how
11:40
it works all the other things you can simply see
11:44
by doing ops minus t and lists all the various action invokers URL logs and
11:50
then the plugins AI IDE admin configuration setup all this serves to
11:57
install it there is really a lot of stuff so you should go and see the
12:02
documentation for details normally however this is what you need and these
12:08
are a bit low-level because almost everything is done using IDE actions
12:14
instead that are the ones that are here so what does the login that you have
12:20
already seen so I can redo the login so it's HTTP open serverless point dev so
12:27
here I can redo the login instead of using this can I deploy which is the
12:32
same thing as pressing here i can deploy only one action so if you don't want to
12:38
redeploy everything every time and you want to deploy one just write ops IDE
12:42
deploy hello llm the difference that there is between the deployment with
12:48
this tool and the creation of the action is that this manages the packaging of
12:53
shares and a whole host of extra things that you would otherwise have to do by
12:57
hand it is explained in the documentation how it is done but this
13:02
automates it so basically using these tools do now and do it even sooner using
13:08
devel that pretty much throws everything pack it up and you can write the code
13:12
and deploy it on the fly well last thing the clean which is useful because there
13:19
are temporary files and sometimes pieces remain so it's better to do a clean
13:26
because it is incremental so if an old file remains then you may have some
13:30
problems and then the clean comes to your rescue okay so these are the
13:36
development tools and finally there's a specific plug-in for the course that
13:40
ops ai which provides a number of python specific tools so ops ai lesson is used
13:47
to download the lessons of the course then ops ai user you saw it it is used
13:53
to add and create user then there's ops ai chat which is very nice because
13:58
it's a command line version of the chat you saw here so for example I can do
14:02
opsai chat hello llm and I can talk with AI as I did before who are you from the
14:10
command line so now I'm talking to llama or I can call the store okay so asterisk
14:18
that lists the files i can also upload them like this at tests mastro GPT test
14:25
hello here and then AI CLI this is immensely useful when you do development
14:32
in fact I will use it because it is a Python interpreter and finally ops ai new
14:39
that creates you a new service you have to give it a parameter in fact now we
14:45
will use it in the exercise all right so here I am summarized the things I have
14:51
said so then exercise now let's put together everything we have seen doing
14:58
an exercise therefore preview I take the
15:06
exercise the exercise consists of implementing a simple chat that in this
15:11
serves to reverse the text then so let's go here let's go to Ollama and write how
15:17
do I invert the string s in Python and told us code to reverse the
15:23
string they're going to use this thing to invert the string then the goal is to
15:29
create a new service and so here we will execute this command which I can do
15:34
immediately because as I told you ops AI to a wizard new reverse and usually
15:41
makes a package that is called as the action in this case I give him the
15:45
package mine and I call it reverse "msciab" so I do mine lapels in my packag
15:52
so if I now go to the packages you see that there is "msciab" so there is a
15:57
Msciab package there is a reverse service that ready to use for deployment using
16:03
all the conventions of the environment and there are also two tests therefore
16:09
you see that under msciab there is unit reverse testing and integration testing
16:15
so if you try to run the tests you will find out right away that the unit
16:20
integration test passes so now I'm going to refresh here you are if I do the
16:26
integration test passes but I have the unitary test no indeed it had passed
16:33
because had already been filed before i try to remove this problem so we send it
16:40
back to the terminal and I do ops action delete msciab reverse he was not
16:47
supposed to pass but unfortunately he remained from the previous time then as
16:53
soon as you create the integration test it should fail because has not been
16:58
deployed therefore or deploy it everything or just that service the best
17:05
thing is to deploy everything deploy and then passes the test integration of a
17:11
service empty practically which simply it echoes what it writes so that's it
17:17
done the deploy let's rerun the integration test and default pass okay
17:22
so now we have a new service that we can use the nice thing is that we can
17:27
immediately add this service to the other services simply going here as the
17:33
slide says add it to the index so there is an index under packages mastro GPT
17:40
index there are two files you can create a third file or just edit this one and
17:46
put the new service on it then reverse msciab
17:52
reverse okay good and now if we go to the user interfaces in msciab we recharge
18:01
it pinocchio Geppetto login I realized that I had to deploy also in the
18:09
index so ops ai deploy mastro GPT index here this here I had to deploy
18:19
it here is the reverse which is trivial because whatever we say to him always
18:25
tells us the reverse but it is a starting point right now let's implement
18:30
the actual reverse and go to do the code now here I use Python programmer
18:35
techniques so I put the command line here i take the code of reverse then
18:42
packages msciab of reverse here here you see that there is always a main that
18:48
calls a function and the function is this so here we need to implement a I
18:53
will explain in the next lessons how it works the mechanism however sustainably
18:59
the functionals take an input and return an output so the thing I do is in equals
19:04
args get input and it is better to put this one here which also gives a default
19:09
then I write if int equals zero because the first time he start the conversation
19:16
with a message blank then please provide an input so I the answer I will return
19:23
without and only if inp will out equal to the inverse in
19:31
practice here is a very simple exercise it's interesting when you develop it put
19:37
it in devel mode so as you write the code he deploys it on the fly so
19:44
now okay if I try to ask him now to redo reverse here you see that the first time
19:51
I activate a chat he sends an empty input and he replied if I now say pipo
19:57
he gives it to me inverted adapting it to show you how you can edit i now give
20:02
it an output with an asterisk at the beginning and in the end just to show
20:08
you see that he immediately updated everything so if I now I try it again
20:15
instead he interprets it as italics if I put the double asterisk instead as bold
20:21
here this is a simple exercise but it allows you to familiarize yourself with
20:26
the system and to understand how easy it is to create new actions to extend it
20:32
since we will create many of them so I recommend you do it with this I am
20:37
finished goodbye