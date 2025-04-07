
import { z } from "zod";


// EntityType
export enum EntityType {
  PROPOSAL = "PROPOSAL",
  MILESTONE = "MILESTONE"
}

export const EntityTypeSchema = z.nativeEnum(EntityType);

// TemplateType

export enum TemplateType {
  CREATE_PROPOSAL = "CREATE_PROPOSAL",
  EDIT_PROPOSAL_DETAILS = "EDIT_PROPOSAL_DETAILS",
  EDIT_TAXONOMY = "EDIT_TAXONOMY",
  EDIT_TAGS = "EDIT_TAGS",
  EDIT_BENEFITS = "EDIT_BENEFITS",
  CREATE_MILESTONE = "CREATE_MILESTONE",
  EDIT_MILESTONE = "EDIT_MILESTONE",
  REMAP_MILESTONE = "REMAP_MILESTONE"
}

export const TemplateTypeSchema = z.nativeEnum(TemplateType);

// BulkActionStatus

export enum BulkActionStatus {
  SUCCESS = "Success",
  FAILED = "Failed",
  PROCESSING = "Processing",
  CANCELLED = "Cancelled"
}

export const BulkActionStatusSchema = z.nativeEnum(BulkActionStatus);

// Action
enum Action {
  UPLOAD = "Upload",
  DOWNLOAD = "Download"
}
export const ActionSchema = z.nativeEnum(Action);

// ErrorList
const ErrorListSchema = z.object({
  description: z.string().optional(),
  row: z.number().int(),
  column: z.number().int(),
  error: z.string()
});
export type ErrorListType = z.infer<typeof ErrorListSchema>;

// BulkActionResponseData
const BulkActionResponseDataSchema = z.object({
  longId: z.string(),
  shortId: z.string(),
  relatedLongId: z.string().nullish(),
  action: ActionSchema,
  templateType: TemplateTypeSchema,
  entityType: EntityTypeSchema,
  requestedByRoles: z.string(),
  requestPayload: z.string(),
  status: BulkActionStatusSchema,
  startTime: z.string().nullish(),
  endTime: z.string().nullish(),
  requestedBy: z.string(),
  totalCount: z.number().int(),
  processedCount: z.number().int(),
  errorCount: z.number().int(),
  errorList: z.array(ErrorListSchema).nullish(),
  processingMessage: z.string().nullish(),
  userUploadedFileName: z.string().nullish(),
  uploadedFileKey: z.string().nullish(),
  bulkActionFileKey: z.string().nullish()
});


export type BulkActionResponseDataType = z.infer<typeof BulkActionResponseDataSchema>;

// BulkActionResponse
export const BulkActionResponseSchema = z.object({
  data: BulkActionResponseDataSchema
});

export type BulkActionResponseType = z.infer<typeof BulkActionResponseSchema>;