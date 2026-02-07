package apis_test

import (
	"bytes"
	"mime/multipart"
	"net/http"
	"testing"

	"github.com/pocketbase/pocketbase/tests"
)

func TestFilesUploadLink(t *testing.T) {
	t.Parallel()

	// Prepare multipart form
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile("files", "test.txt")
	if err != nil {
		t.Fatal(err)
	}
	part.Write([]byte("test content"))
	writer.Close()

	scenarios := []tests.ApiScenario{
		{
			Name: "upload file and check url in response",
			Method: http.MethodPost,
			URL:    "/api/files/upload",
			Body:   body,
			Headers: map[string]string{
				"Content-Type":  writer.FormDataContentType(),
				"Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InN5d2JoZWNuaDQ2cmhtMCIsInR5cGUiOiJhdXRoIiwiY29sbGVjdGlvbklkIjoicGJjXzMxNDI2MzU4MjMiLCJleHAiOjI1MjQ2MDQ0NjEsInJlZnJlc2hhYmxlIjp0cnVlfQ.UXgO3j-0BumcugrFjbd7j0M4MQvbrLggLlcu_YNGjoY", // Admin token from tests
			},
			ExpectedStatus: 200,
			ExpectedContent: []string{
				`"url":"http://localhost:8090/api/files/`, // The default AppURL in tests is usually localhost:8090
				`test.txt"`,
			},
		},
	}

	for _, scenario := range scenarios {
		scenario.Test(t)
	}
}
