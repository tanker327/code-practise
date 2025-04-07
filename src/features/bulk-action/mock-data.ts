import { BulkActionResponseDataType, BulkActionResponseType } from "./BulkActionSchema";

export const mockStatusData: BulkActionResponseDataType = {
  "longId": "longId_test_1234567890",
  "shortId": "shortId_test_1234567890",
  "relatedLongId": "relatedLongId_test_1234567890",
  "action": "Upload/Download",
  "templateType": "editProposal/editMilestone/editTag/editTaxonomy",
  "entityType": "PROPOSAL/MILESTONE",
  "requestPayload": "",
  "status": "Failed",
  "startTime": "2024-11-20T22:58:17.000Z",
  "requestedBy": "",
  "requestedByRoles": "",
  "endTime": "2024-11-20T23:58:17.000Z",
  "totalCount": 1000,
  "processedCount": 150,
  "errorCount": 10,
  "errorList": [
    {
      "row": 100,
      "column": 5,
      "error": "Invalid state"
    }
  ],
  "processingMessage": "template action status message/validation failures, etc. at a summary level",
  "userUploadedFileName": "",
  "uploadedFileKey": "",
  "bulkActionFileKey": "fileKey_test_1234567890"
}

export const mockStatusResponse: BulkActionResponseType = {
  data: mockStatusData
}


