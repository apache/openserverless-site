---
title: Java
weight: 20
draft: true
---
## Creating and invoking Java actions

This document is still 🚧 **work in progress** 🚧

The process of creating Java actions is similar to that of [other
actions](#../../actions/index.adoc#the-basics). The following sections
guide you through creating and invoking a single Java action, and
demonstrate how to bundle multiple files and third party dependencies.

In order to compile, test and archive Java files, you must have a [JDK
8](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
installed locally.

A Java action is a Java program with a method called `main` that has the
exact signature as follows:

    public static com.google.gson.JsonObject main(com.google.gson.JsonObject);

For example, create a Java file called `Hello.java` with the following
content:

    import com.google.gson.JsonObject;

    public class Hello {
        public static JsonObject main(JsonObject args) {
            String name = "stranger";
            if (args.has("name"))
                name = args.getAsJsonPrimitive("name").getAsString();
            JsonObject response = new JsonObject();
            response.addProperty("greeting", "Hello " + name + "!");
            return response;
        }
    }

An action supports not only a JSON object but also a JSON array as a
return value.

It would be a simple example that uses an array as a return value:

    import com.google.gson.JsonArray;
    import com.google.gson.JsonObject;
    public class HelloArray {
        public static JsonArray main(JsonObject args) {
            JsonArray jsonArray = new JsonArray();
            jsonArray.add("a");
            jsonArray.add("b");
            return jsonArray;
        }
    }

You can also create a sequence action with actions accepting an array
param and returning an array result.

You can easily figure out the parameters with the following example:

    import com.google.gson.JsonArray;
    public class Sort {
        public static JsonArray main(JsonArray args) {
            return args;
        }
    }

Then, compile `Hello.java` into a JAR file `hello.jar` as follows:

    javac Hello.java

    jar cvf hello.jar Hello.class

**Note:** [google-gson](https://github.com/google/gson) must exist in
your Java CLASSPATH when compiling the Java file.

You can create a OpenWhisk and OpenServerless action called `helloJava`
from this JAR file as follows:

    ops action create helloJava hello.jar --main Hello

When you use the command line and a `.jar` source file, you do not need
to specify that you are creating a Java action; the tool determines that
from the file extension.

You need to specify the name of the main class using `--main`. An
eligible main class is one that implements a static `main` method as
described above. If the class is not in the default package, use the
Java fully-qualified class name, e.g., `--main com.example.MyMain`.

If needed you can also customize the method name of your Java action.
This can be done by specifying the Java fully-qualified method name of
your action, e.q., `--main com.example.MyMain#methodName`

Action invocation is the same for Java actions as it is for Swift and
JavaScript actions:

    ops action invoke --result helloJava --param name World

      {
          "greeting": "Hello World!"
      }

Find out more about parameters in the [Working with
Parameters](#../../../reference/parameters/index#working-with-parameters)
section.
