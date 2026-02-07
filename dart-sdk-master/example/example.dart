// ignore_for_file: unnecessary_lambdas

import "dart:async";
import "dart:io";

import "package:http/http.dart" as http;
import "package:pocketbase/pocketbase.dart";

void main() async {
  final pb = PocketBase("http://127.0.0.1:8090");

  // fetch a paginated list with "example" records
  try {
    final result = await pb.collection("example").getList(page: 1, perPage: 10);
    print("Records Result: $result");
  } catch (error) {
    print("Records Error: $error");
  }

  // Example of using enhanced filters
  try {
    const contains = "contains(tags, 'dart')";
    final filteredResult = await pb.collection("example").getList(
          filter: pb.filter(
            "status = 'active' && created >= {:created} && $contains",
            {"created": DateTime.now().subtract(const Duration(days: 7))},
          ),
        );
    print("Filtered Result: $filteredResult");
  } catch (error) {
    print("Filter Error: $error");
  }

  // Full-text search example
  try {
    final searchResult =
        await pb.collection("example").search("dart programming");
    print("Search Result: $searchResult");
  } catch (error) {
    print("Search Error: $error");
  }

  // Vector database examples
  try {
    // Upsert vectors
    final vectors = [
      VectorRecord(
        id: "vec1",
        type: "text",
        embedding: [0.1, 0.2, 0.3], // example embedding
        metadata: {"content": "Dart programming language"},
      ),
    ];
    final vectorResult = await pb.vectors.upsert(vectors);
    print("Vector Upsert Result: $vectorResult");

    // Search vectors by text
    final searchResults = await pb.vectors.search(text: "programming");
    print("Vector Search Results: $searchResults");
  } catch (error) {
    print("Vector Error: $error");
  }

  // File system examples
  try {
    // Upload a file
    final file = File("example.txt");
    await file.writeAsString("Hello, PocketBase!");
    final multipartFile = await http.MultipartFile.fromPath("files", file.path);
    final uploadResult = await pb.files.upload([multipartFile]);
    print("File Upload Result: $uploadResult");

    // List files
    final files = await pb.files.getList();
    print("Files List: $files");

    if (files.items.isNotEmpty) {
      final fileId = files.items.first.id;
      final fileInfo = await pb.files.getOne(fileId);
      print("File Info: $fileInfo");
    }
  } catch (error) {
    print("File Error: $error");
  }

  // listen to realtime connect/reconnect events
  await pb.realtime.subscribe("PB_CONNECT", (e) {
    print("Connected: $e");
  });

  // subscribe to realtime changes in the "example" collection
  await pb.collection("example").subscribe("*", (e) {
    print(e.action); // create, update, delete
    print(e.record); // the changed record
  });

  // unsubsribe from all "example" realtime subscriptions after 10 seconds
  Timer(const Duration(seconds: 10), () {
    pb.realtime.unsubscribe(); // unsubscribe from all realtime events
  });
}
