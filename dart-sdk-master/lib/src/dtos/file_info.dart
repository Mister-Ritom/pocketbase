import "jsonable.dart";

/// Represents a file stored in the PocketBase file system.
class FileInfo extends Jsonable {
  String id;
  String originalName;
  String storedName;
  String mime;
  int size;
  String storagePath;
  String storageAdapter;
  bool protected;
  DateTime createdAt;
  DateTime updatedAt;
  String? createdBy;
  String url;

  FileInfo({
    required this.id,
    required this.originalName,
    required this.storedName,
    required this.mime,
    required this.size,
    required this.storagePath,
    required this.storageAdapter,
    required this.protected,
    DateTime? createdAt,
    DateTime? updatedAt,
    this.createdBy,
    this.url = "",
  })  : createdAt = createdAt ?? DateTime.now(),
        updatedAt = updatedAt ?? DateTime.now();

  factory FileInfo.fromJson(Map<String, dynamic> json) {
    return FileInfo(
      id: json["id"] as String,
      originalName: json["original_name"] as String,
      storedName: json["stored_name"] as String,
      mime: json["mime"] as String,
      size: json["size"] as int,
      storagePath: json["storage_path"] as String,
      storageAdapter: json["storage_adapter"] as String,
      protected: json["protected"] as bool,
      createdAt: DateTime.parse(json["created_at"] as String),
      updatedAt: DateTime.parse(json["updated_at"] as String),
      createdBy: json["created_by"] as String?,
      url: (json["url"] as String?) ?? "",
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "original_name": originalName,
      "stored_name": storedName,
      "mime": mime,
      "size": size,
      "storage_path": storagePath,
      "storage_adapter": storageAdapter,
      "protected": protected,
      "created_at": createdAt.toIso8601String(),
      "updated_at": updatedAt.toIso8601String(),
      "created_by": createdBy,
      "url": url,
    };
  }
}

/// Response from file upload operations.
class FileUploadResponse extends Jsonable {
  List<FileInfo> files;

  FileUploadResponse({required this.files});

  factory FileUploadResponse.fromJson(Map<String, dynamic> json) {
    return FileUploadResponse(
      files: (json["files"] as List<dynamic>)
          .map((item) => FileInfo.fromJson(item as Map<String, dynamic>))
          .toList(),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {"files": files.map((file) => file.toJson()).toList()};
  }
}

/// Response from file list operations.
class FileListResponse extends Jsonable {
  int page;
  int perPage;
  int totalItems;
  int totalPages;
  List<FileInfo> items;

  FileListResponse({
    required this.page,
    required this.perPage,
    required this.totalItems,
    required this.totalPages,
    required this.items,
  });

  factory FileListResponse.fromJson(Map<String, dynamic> json) {
    return FileListResponse(
      page: json["page"] as int,
      perPage: json["perPage"] as int,
      totalItems: json["totalItems"] as int,
      totalPages: json["totalPages"] as int,
      items: (json["items"] as List<dynamic>)
          .map((item) => FileInfo.fromJson(item as Map<String, dynamic>))
          .toList(),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      "page": page,
      "perPage": perPage,
      "totalItems": totalItems,
      "totalPages": totalPages,
      "items": items.map((item) => item.toJson()).toList(),
    };
  }
}
