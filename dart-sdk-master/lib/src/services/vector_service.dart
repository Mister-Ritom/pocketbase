import "../client.dart";
import "../dtos/vector_record.dart";
import "base_service.dart";

/// The service that handles the **Vector APIs**.
///
/// Usually shouldn't be initialized manually and instead
/// [PocketBase.vectors] should be used.
class VectorService extends BaseService {
  VectorService(super.client);

  /// Upserts (creates or updates) vector records.
  ///
  /// The [vectors] parameter should contain the vector records to upsert.
  /// The [imageData] parameter can be used to pass base64 encoded image data.
  Future<VectorResponse> upsert(
    List<VectorRecord> vectors, {
    String? imageData,
  }) {
    final request = VectorUpsertRequest(vectors: vectors, imageData: imageData);
    return client
        .send<Map<String, dynamic>>(
          "/api/vectors/upsert",
          method: "POST",
          body: request.toJson(),
        )
        .then(VectorResponse.fromJson);
  }

  /// Searches for vectors using text, image, or embedding.
  ///
  /// At least one of [embedding], [text], or [imageData] must be provided.
  /// The [top] parameter limits the number of results (default: 10, max: 100).
  /// The [type] parameter filters by vector type.
  /// The [filters] parameter allows additional filtering.
  Future<VectorSearchResponse> search({
    List<double>? embedding,
    String? text,
    String? imageData,
    int? top,
    String? type,
    Map<String, dynamic>? filters,
  }) {
    final request = VectorSearchRequest(
      embedding: embedding,
      text: text,
      imageData: imageData,
      top: top,
      type: type,
      filters: filters,
    );
    return client
        .send<Map<String, dynamic>>(
          "/api/vectors/search",
          method: "POST",
          body: request.toJson(),
        )
        .then(VectorSearchResponse.fromJson);
  }

  /// Returns paginated list of vector records.
  ///
  /// The [page] parameter specifies the page number (default: 1).
  /// The [perPage] parameter specifies items per page (default: 50, max: 1000).
  Future<VectorListResponse> getList({int page = 1, int perPage = 50}) {
    return client.send<Map<String, dynamic>>(
      "/api/vectors",
      query: {"page": page.toString(), "perPage": perPage.toString()},
    ).then(VectorListResponse.fromJson);
  }

  /// Returns single vector record by its id.
  Future<VectorRecord> getOne(String id) {
    return client
        .send<Map<String, dynamic>>("/api/vectors/$id")
        .then(VectorRecord.fromJson);
  }

  /// Deletes single vector record by its id.
  Future<void> delete(String id) {
    return client.send("/api/vectors/$id", method: "DELETE");
  }
}
