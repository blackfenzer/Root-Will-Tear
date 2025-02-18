# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: inference.proto
# Protobuf Python Version: 5.29.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    29,
    0,
    '',
    'inference.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import empty_pb2 as google_dot_protobuf_dot_empty__pb2
from google.rpc import status_pb2 as google_dot_rpc_dot_status__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0finference.proto\x12 org.pytorch.serve.grpc.inference\x1a\x1bgoogle/protobuf/empty.proto\x1a\x17google/rpc/status.proto\"\xe7\x01\n\x12PredictionsRequest\x12\x12\n\nmodel_name\x18\x01 \x01(\t\x12\x15\n\rmodel_version\x18\x02 \x01(\t\x12N\n\x05input\x18\x03 \x03(\x0b\x32?.org.pytorch.serve.grpc.inference.PredictionsRequest.InputEntry\x12\x18\n\x0bsequence_id\x18\x04 \x01(\tH\x00\x88\x01\x01\x1a,\n\nInputEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\x0c:\x02\x38\x01\x42\x0e\n\x0c_sequence_id\"\x86\x01\n\x12PredictionResponse\x12\x12\n\nprediction\x18\x01 \x01(\x0c\x12\x18\n\x0bsequence_id\x18\x02 \x01(\tH\x00\x88\x01\x01\x12\'\n\x06status\x18\x03 \x01(\x0b\x32\x12.google.rpc.StatusH\x01\x88\x01\x01\x42\x0e\n\x0c_sequence_idB\t\n\x07_status\"*\n\x18TorchServeHealthResponse\x12\x0e\n\x06health\x18\x01 \x01(\t2\x80\x04\n\x14InferenceAPIsService\x12\\\n\x04Ping\x12\x16.google.protobuf.Empty\x1a:.org.pytorch.serve.grpc.inference.TorchServeHealthResponse\"\x00\x12{\n\x0bPredictions\x12\x34.org.pytorch.serve.grpc.inference.PredictionsRequest\x1a\x34.org.pytorch.serve.grpc.inference.PredictionResponse\"\x00\x12\x83\x01\n\x11StreamPredictions\x12\x34.org.pytorch.serve.grpc.inference.PredictionsRequest\x1a\x34.org.pytorch.serve.grpc.inference.PredictionResponse\"\x00\x30\x01\x12\x86\x01\n\x12StreamPredictions2\x12\x34.org.pytorch.serve.grpc.inference.PredictionsRequest\x1a\x34.org.pytorch.serve.grpc.inference.PredictionResponse\"\x00(\x01\x30\x01\x42\x02P\x01\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'inference_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'P\001'
  _globals['_PREDICTIONSREQUEST_INPUTENTRY']._loaded_options = None
  _globals['_PREDICTIONSREQUEST_INPUTENTRY']._serialized_options = b'8\001'
  _globals['_PREDICTIONSREQUEST']._serialized_start=108
  _globals['_PREDICTIONSREQUEST']._serialized_end=339
  _globals['_PREDICTIONSREQUEST_INPUTENTRY']._serialized_start=279
  _globals['_PREDICTIONSREQUEST_INPUTENTRY']._serialized_end=323
  _globals['_PREDICTIONRESPONSE']._serialized_start=342
  _globals['_PREDICTIONRESPONSE']._serialized_end=476
  _globals['_TORCHSERVEHEALTHRESPONSE']._serialized_start=478
  _globals['_TORCHSERVEHEALTHRESPONSE']._serialized_end=520
  _globals['_INFERENCEAPISSERVICE']._serialized_start=523
  _globals['_INFERENCEAPISSERVICE']._serialized_end=1035
# @@protoc_insertion_point(module_scope)
