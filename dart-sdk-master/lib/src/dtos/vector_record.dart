import "jsonable.dart";

/// Represents a vector record in the database.
class VectorRecord extends Jsonable {
  String id;
  String type;
  String? refId;
  List<double> embedding;
  Map<String, dynamic> metadata;
  DateTime createdAt;

  VectorRecord({
    required this.id,
    required this.type,
    this.refId,
    required this.embedding,
    Map<String, dynamic>? metadata,
    DateTime? createdAt,
  })  : metadata = metadata ?? {},
        createdAt = createdAt ?? DateTime.now();

  factory VectorRecord.fromJson(Map<String, dynamic> json) {
    return VectorRecord(
      id: json["id"] as String,
      type: json["type"] as String,
      refId: json["ref_id"] as String?,
      embedding: (json["embedding"] as List<dynamic>).cast<double>(),
      metadata: (json["metadata"] as Map<String, dynamic>?) ?? {},
      createdAt: DateTime.parse(json["created_at"] as String),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "type": type,
      "ref_id": refId,
      "embedding": embedding,
      "metadata": metadata,
      "created_at": createdAt.toIso8601String(),
    };
  }
}

/// Result from a vector search operation.
class VectorSearchResult extends Jsonable {
  String id;
  String type;
  String? refId;
  List<double> embedding;
  Map<String, dynamic> metadata;
  DateTime createdAt;
  double score;

  VectorSearchResult({
    required this.id,
    required this.type,
    this.refId,
    required this.embedding,
    Map<String, dynamic>? metadata,
    required this.createdAt,
    required this.score,
  }) : metadata = metadata ?? {};

  factory VectorSearchResult.fromJson(Map<String, dynamic> json) {
    return VectorSearchResult(
      id: json["id"] as String,
      type: json["type"] as String,
      refId: json["ref_id"] as String?,
      embedding: (json["embedding"] as List<dynamic>).cast<double>(),
      metadata: (json["metadata"] as Map<String, dynamic>?) ?? {},
      createdAt: DateTime.parse(json["created_at"] as String),
      score: (json["score"] as num).toDouble(),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "type": type,
      "ref_id": refId,
      "embedding": embedding,
      "metadata": metadata,
      "created_at": createdAt.toIso8601String(),
      "score": score,
    };
  }
}

/// Request for vector upsert operation.
class VectorUpsertRequest extends Jsonable {
  List<VectorRecord> vectors;
  String? imageData;

  VectorUpsertRequest({required this.vectors, this.imageData});

  @override
  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{
      "vectors": vectors.map((v) => v.toJson()).toList()
    };
    if (imageData != null) {
      json["imageData"] = imageData;
    }
    return json;
  }
}

/// Request for vector search operation.
class VectorSearchRequest extends Jsonable {
  List<double>? embedding;
  String? text;
  String? imageData;
  int? top;
  String? type;
  Map<String, dynamic>? filters;

  VectorSearchRequest({
    this.embedding,
    this.text,
    this.imageData,
    this.top,
    this.type,
    this.filters,
  });

  @override
  Map<String, dynamic> toJson() {
    return <String, dynamic>{
      if (embedding != null) "embedding": embedding,
      if (text != null) "text": text,
      if (imageData != null) "imageData": imageData,
      if (top != null) "top": top,
      if (type != null) "type": type,
      if (filters != null) "filters": filters,
    };
  }
}

/// Response from vector operations.
class VectorResponse extends Jsonable {
  String message;
  int count;

  VectorResponse({required this.message, required this.count});

  factory VectorResponse.fromJson(Map<String, dynamic> json) {
    return VectorResponse(
      message: json["message"] as String,
      count: json["count"] as int,
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {"message": message, "count": count};
  }
}

/// Response from vector search operation.
class VectorSearchResponse extends Jsonable {
  List<VectorSearchResult> results;

  VectorSearchResponse({required this.results});

  factory VectorSearchResponse.fromJson(Map<String, dynamic> json) {
    return VectorSearchResponse(
      results: (json["results"] as List<dynamic>)
          .map(
            (item) => VectorSearchResult.fromJson(item as Map<String, dynamic>),
          )
          .toList(),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {"results": results.map((r) => r.toJson()).toList()};
  }
}

/// Response from vector list operation.
class VectorListResponse extends Jsonable {
  int page;
  int perPage;
  int totalItems;
  int totalPages;
  List<VectorRecord> items;

  VectorListResponse({
    required this.page,
    required this.perPage,
    required this.totalItems,
    required this.totalPages,
    required this.items,
  });

  factory VectorListResponse.fromJson(Map<String, dynamic> json) {
    return VectorListResponse(
      page: json["page"] as int,
      perPage: json["perPage"] as int,
      totalItems: json["totalItems"] as int,
      totalPages: json["totalPages"] as int,
      items: (json["items"] as List<dynamic>)
          .map((item) => VectorRecord.fromJson(item as Map<String, dynamic>))
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
