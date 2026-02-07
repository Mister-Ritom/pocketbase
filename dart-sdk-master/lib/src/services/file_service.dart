import "package:http/http.dart" as http;

import "../client.dart";
import "../dtos/file_info.dart";
import "../dtos/record_model.dart";
import "base_service.dart";

/// The service that handles the **File APIs**.
///
/// Usually shouldn't be initialized manually and instead
/// [PocketBase.files] should be used.
class FileService extends BaseService {
  FileService(super.client);

  // Legacy alias of getURL().
  Uri getUrl(
    RecordModel record,
    String filename, {
    String? thumb,
    String? token,
    bool? download,
    Map<String, dynamic> query = const {},
  }) {
    return getURL(
      record,
      filename,
      thumb: thumb,
      token: token,
      download: download,
      query: query,
    );
  }

  /// Builds and returns an absolute record file url.
  Uri getURL(
    RecordModel record,
    String filename, {
    String? thumb,
    String? token,
    bool? download,
    Map<String, dynamic> query = const {},
  }) {
    if (filename.isEmpty || record.id.isEmpty) {
      return Uri(); // blank Uri
    }

    final params = Map<String, dynamic>.of(query);
    params["thumb"] ??= thumb;
    params["token"] ??= token;
    if (download != null && download) {
      params["download"] = "";
    }

    final collectionIdOrName = record.collectionId.isEmpty
        ? record.collectionName
        : record.collectionId;

    return client.buildURL(
      "/api/files/${Uri.encodeComponent(collectionIdOrName)}/${Uri.encodeComponent(record.id)}/${Uri.encodeComponent(filename)}",
      params,
    );
  }

  /// Requests a new private file access token for the current auth model.
  Future<String> getToken({
    Map<String, dynamic> body = const {},
    Map<String, dynamic> query = const {},
    Map<String, String> headers = const {},
  }) {
    return client
        .send<Map<String, dynamic>>(
          "/api/files/token",
          method: "POST",
          body: body,
          query: query,
          headers: headers,
        )
        .then((data) => data["token"] as String);
  }

  // -----------------------------------------------------------------
  // Standalone file operations
  // -----------------------------------------------------------------

  /// Uploads standalone files.
  ///
  /// The [files] parameter should contain the multipart files to upload.
  Future<FileUploadResponse> upload(
    List<http.MultipartFile> files, {
    Map<String, dynamic> body = const {},
    Map<String, String> headers = const {},
  }) {
    return client
        .send<Map<String, dynamic>>(
          "/api/files/upload",
          method: "POST",
          body: body,
          files: files,
          headers: headers,
        )
        .then(FileUploadResponse.fromJson);
  }

  /// Returns paginated list of standalone files.
  ///
  /// The [page] parameter specifies the page number (default: 1).
  /// The [perPage] parameter specifies items per page (default: 30, max: 1000).
  /// The [filter] parameter allows filtering files by name.
  Future<FileListResponse> getList({
    int page = 1,
    int perPage = 30,
    String? filter,
  }) {
    final query = <String, dynamic>{
      "page": page.toString(),
      "perPage": perPage.toString(),
    };
    if (filter != null && filter.isNotEmpty) {
      query["filter"] = filter;
    }

    return client
        .send<Map<String, dynamic>>("/api/files", query: query)
        .then(FileListResponse.fromJson);
  }

  /// Returns single standalone file by its id.
  Future<FileInfo> getOne(String id) {
    return client
        .send<Map<String, dynamic>>("/api/files/$id")
        .then(FileInfo.fromJson);
  }

  /// Deletes single standalone file by its id.
  Future<void> delete(String id) {
    return client.send("/api/files/$id", method: "DELETE");
  }

  /// Builds and returns a standalone file download url.
  Uri getFileURL(String id, String filename, {String? token}) {
    final params = <String, dynamic>{};
    if (token != null && token.isNotEmpty) {
      params["token"] = token;
    }

    return client.buildURL(
      "/api/files/${Uri.encodeComponent(id)}/${Uri.encodeComponent(filename)}",
      params,
    );
  }

  /// Downloads a standalone file by its id and filename.
  Future<http.StreamedResponse> download(
    String id,
    String filename, {
    String? token,
    Map<String, String> headers = const {},
  }) {
    final url = getFileURL(id, filename, token: token);

    // Create a new request for the file download
    final request = http.Request("GET", url);
    if (headers.isNotEmpty) {
      request.headers.addAll(headers);
    }
    if (client.authStore.isValid) {
      request.headers["Authorization"] = client.authStore.token;
    }
    if (!headers.containsKey("Accept-Language")) {
      request.headers["Accept-Language"] = client.lang;
    }

    final requestClient = client.httpClientFactory();
    return requestClient.send(request);
  }
}
