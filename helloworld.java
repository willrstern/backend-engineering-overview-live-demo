import static spark.Spark.*;
// using Spark microframework for Java/Kotlin

public class HelloWorld {
    public static void main(String[] args) {
        get("/hello", (req, res) -> "Hello world!");
        
        get("/hello/:name", (request, response) -> {
          return "Hello: " + request.params(":name") + "!";
        });
    }
}