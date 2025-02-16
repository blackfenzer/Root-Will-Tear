# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: open_inference_grpc.proto
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
    'open_inference_grpc.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x19open_inference_grpc.proto\x12$org.pytorch.serve.grpc.openinference\"\x13\n\x11ServerLiveRequest\"\"\n\x12ServerLiveResponse\x12\x0c\n\x04live\x18\x01 \x01(\x08\"\x14\n\x12ServerReadyRequest\"$\n\x13ServerReadyResponse\x12\r\n\x05ready\x18\x01 \x01(\x08\"2\n\x11ModelReadyRequest\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x0f\n\x07version\x18\x02 \x01(\t\"#\n\x12ModelReadyResponse\x12\r\n\x05ready\x18\x01 \x01(\x08\"\x17\n\x15ServerMetadataRequest\"K\n\x16ServerMetadataResponse\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x0f\n\x07version\x18\x02 \x01(\t\x12\x12\n\nextensions\x18\x03 \x03(\t\"5\n\x14ModelMetadataRequest\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x0f\n\x07version\x18\x02 \x01(\t\"\xc3\x02\n\x15ModelMetadataResponse\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x10\n\x08versions\x18\x02 \x03(\t\x12\x10\n\x08platform\x18\x03 \x01(\t\x12Z\n\x06inputs\x18\x04 \x03(\x0b\x32J.org.pytorch.serve.grpc.openinference.ModelMetadataResponse.TensorMetadata\x12[\n\x07outputs\x18\x05 \x03(\x0b\x32J.org.pytorch.serve.grpc.openinference.ModelMetadataResponse.TensorMetadata\x1a?\n\x0eTensorMetadata\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x10\n\x08\x64\x61tatype\x18\x02 \x01(\t\x12\r\n\x05shape\x18\x03 \x03(\x03\"\xe1\x08\n\x11ModelInferRequest\x12\x12\n\nmodel_name\x18\x01 \x01(\t\x12\x15\n\rmodel_version\x18\x02 \x01(\t\x12\n\n\x02id\x18\x03 \x01(\t\x12[\n\nparameters\x18\x04 \x03(\x0b\x32G.org.pytorch.serve.grpc.openinference.ModelInferRequest.ParametersEntry\x12X\n\x06inputs\x18\x05 \x03(\x0b\x32H.org.pytorch.serve.grpc.openinference.ModelInferRequest.InferInputTensor\x12\x63\n\x07outputs\x18\x06 \x03(\x0b\x32R.org.pytorch.serve.grpc.openinference.ModelInferRequest.InferRequestedOutputTensor\x12\x1a\n\x12raw_input_contents\x18\x07 \x03(\x0c\x1a\xe5\x02\n\x10InferInputTensor\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x10\n\x08\x64\x61tatype\x18\x02 \x01(\t\x12\r\n\x05shape\x18\x03 \x03(\x03\x12l\n\nparameters\x18\x04 \x03(\x0b\x32X.org.pytorch.serve.grpc.openinference.ModelInferRequest.InferInputTensor.ParametersEntry\x12K\n\x08\x63ontents\x18\x05 \x01(\x0b\x32\x39.org.pytorch.serve.grpc.openinference.InferTensorContents\x1ag\n\x0fParametersEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\x43\n\x05value\x18\x02 \x01(\x0b\x32\x34.org.pytorch.serve.grpc.openinference.InferParameter:\x02\x38\x01\x1a\x8b\x02\n\x1aInferRequestedOutputTensor\x12\x0c\n\x04name\x18\x01 \x01(\t\x12v\n\nparameters\x18\x02 \x03(\x0b\x32\x62.org.pytorch.serve.grpc.openinference.ModelInferRequest.InferRequestedOutputTensor.ParametersEntry\x1ag\n\x0fParametersEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\x43\n\x05value\x18\x02 \x01(\x0b\x32\x34.org.pytorch.serve.grpc.openinference.InferParameter:\x02\x38\x01\x1ag\n\x0fParametersEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\x43\n\x05value\x18\x02 \x01(\x0b\x32\x34.org.pytorch.serve.grpc.openinference.InferParameter:\x02\x38\x01\"\xf7\x05\n\x12ModelInferResponse\x12\x12\n\nmodel_name\x18\x01 \x01(\t\x12\x15\n\rmodel_version\x18\x02 \x01(\t\x12\n\n\x02id\x18\x03 \x01(\t\x12\\\n\nparameters\x18\x04 \x03(\x0b\x32H.org.pytorch.serve.grpc.openinference.ModelInferResponse.ParametersEntry\x12[\n\x07outputs\x18\x05 \x03(\x0b\x32J.org.pytorch.serve.grpc.openinference.ModelInferResponse.InferOutputTensor\x12\x1b\n\x13raw_output_contents\x18\x06 \x03(\x0c\x1a\xe8\x02\n\x11InferOutputTensor\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x10\n\x08\x64\x61tatype\x18\x02 \x01(\t\x12\r\n\x05shape\x18\x03 \x03(\x03\x12n\n\nparameters\x18\x04 \x03(\x0b\x32Z.org.pytorch.serve.grpc.openinference.ModelInferResponse.InferOutputTensor.ParametersEntry\x12K\n\x08\x63ontents\x18\x05 \x01(\x0b\x32\x39.org.pytorch.serve.grpc.openinference.InferTensorContents\x1ag\n\x0fParametersEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\x43\n\x05value\x18\x02 \x01(\x0b\x32\x34.org.pytorch.serve.grpc.openinference.InferParameter:\x02\x38\x01\x1ag\n\x0fParametersEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\x43\n\x05value\x18\x02 \x01(\x0b\x32\x34.org.pytorch.serve.grpc.openinference.InferParameter:\x02\x38\x01\"i\n\x0eInferParameter\x12\x14\n\nbool_param\x18\x01 \x01(\x08H\x00\x12\x15\n\x0bint64_param\x18\x02 \x01(\x03H\x00\x12\x16\n\x0cstring_param\x18\x03 \x01(\tH\x00\x42\x12\n\x10parameter_choice\"\xd0\x01\n\x13InferTensorContents\x12\x15\n\rbool_contents\x18\x01 \x03(\x08\x12\x14\n\x0cint_contents\x18\x02 \x03(\x05\x12\x16\n\x0eint64_contents\x18\x03 \x03(\x03\x12\x15\n\ruint_contents\x18\x04 \x03(\r\x12\x17\n\x0fuint64_contents\x18\x05 \x03(\x04\x12\x15\n\rfp32_contents\x18\x06 \x03(\x02\x12\x15\n\rfp64_contents\x18\x07 \x03(\x01\x12\x16\n\x0e\x62ytes_contents\x18\x08 \x03(\x0c\x32\xc6\x06\n\x14GRPCInferenceService\x12\x81\x01\n\nServerLive\x12\x37.org.pytorch.serve.grpc.openinference.ServerLiveRequest\x1a\x38.org.pytorch.serve.grpc.openinference.ServerLiveResponse\"\x00\x12\x84\x01\n\x0bServerReady\x12\x38.org.pytorch.serve.grpc.openinference.ServerReadyRequest\x1a\x39.org.pytorch.serve.grpc.openinference.ServerReadyResponse\"\x00\x12\x81\x01\n\nModelReady\x12\x37.org.pytorch.serve.grpc.openinference.ModelReadyRequest\x1a\x38.org.pytorch.serve.grpc.openinference.ModelReadyResponse\"\x00\x12\x8d\x01\n\x0eServerMetadata\x12;.org.pytorch.serve.grpc.openinference.ServerMetadataRequest\x1a<.org.pytorch.serve.grpc.openinference.ServerMetadataResponse\"\x00\x12\x8a\x01\n\rModelMetadata\x12:.org.pytorch.serve.grpc.openinference.ModelMetadataRequest\x1a;.org.pytorch.serve.grpc.openinference.ModelMetadataResponse\"\x00\x12\x81\x01\n\nModelInfer\x12\x37.org.pytorch.serve.grpc.openinference.ModelInferRequest\x1a\x38.org.pytorch.serve.grpc.openinference.ModelInferResponse\"\x00\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'open_inference_grpc_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_MODELINFERREQUEST_INFERINPUTTENSOR_PARAMETERSENTRY']._loaded_options = None
  _globals['_MODELINFERREQUEST_INFERINPUTTENSOR_PARAMETERSENTRY']._serialized_options = b'8\001'
  _globals['_MODELINFERREQUEST_INFERREQUESTEDOUTPUTTENSOR_PARAMETERSENTRY']._loaded_options = None
  _globals['_MODELINFERREQUEST_INFERREQUESTEDOUTPUTTENSOR_PARAMETERSENTRY']._serialized_options = b'8\001'
  _globals['_MODELINFERREQUEST_PARAMETERSENTRY']._loaded_options = None
  _globals['_MODELINFERREQUEST_PARAMETERSENTRY']._serialized_options = b'8\001'
  _globals['_MODELINFERRESPONSE_INFEROUTPUTTENSOR_PARAMETERSENTRY']._loaded_options = None
  _globals['_MODELINFERRESPONSE_INFEROUTPUTTENSOR_PARAMETERSENTRY']._serialized_options = b'8\001'
  _globals['_MODELINFERRESPONSE_PARAMETERSENTRY']._loaded_options = None
  _globals['_MODELINFERRESPONSE_PARAMETERSENTRY']._serialized_options = b'8\001'
  _globals['_SERVERLIVEREQUEST']._serialized_start=67
  _globals['_SERVERLIVEREQUEST']._serialized_end=86
  _globals['_SERVERLIVERESPONSE']._serialized_start=88
  _globals['_SERVERLIVERESPONSE']._serialized_end=122
  _globals['_SERVERREADYREQUEST']._serialized_start=124
  _globals['_SERVERREADYREQUEST']._serialized_end=144
  _globals['_SERVERREADYRESPONSE']._serialized_start=146
  _globals['_SERVERREADYRESPONSE']._serialized_end=182
  _globals['_MODELREADYREQUEST']._serialized_start=184
  _globals['_MODELREADYREQUEST']._serialized_end=234
  _globals['_MODELREADYRESPONSE']._serialized_start=236
  _globals['_MODELREADYRESPONSE']._serialized_end=271
  _globals['_SERVERMETADATAREQUEST']._serialized_start=273
  _globals['_SERVERMETADATAREQUEST']._serialized_end=296
  _globals['_SERVERMETADATARESPONSE']._serialized_start=298
  _globals['_SERVERMETADATARESPONSE']._serialized_end=373
  _globals['_MODELMETADATAREQUEST']._serialized_start=375
  _globals['_MODELMETADATAREQUEST']._serialized_end=428
  _globals['_MODELMETADATARESPONSE']._serialized_start=431
  _globals['_MODELMETADATARESPONSE']._serialized_end=754
  _globals['_MODELMETADATARESPONSE_TENSORMETADATA']._serialized_start=691
  _globals['_MODELMETADATARESPONSE_TENSORMETADATA']._serialized_end=754
  _globals['_MODELINFERREQUEST']._serialized_start=757
  _globals['_MODELINFERREQUEST']._serialized_end=1878
  _globals['_MODELINFERREQUEST_INFERINPUTTENSOR']._serialized_start=1146
  _globals['_MODELINFERREQUEST_INFERINPUTTENSOR']._serialized_end=1503
  _globals['_MODELINFERREQUEST_INFERINPUTTENSOR_PARAMETERSENTRY']._serialized_start=1400
  _globals['_MODELINFERREQUEST_INFERINPUTTENSOR_PARAMETERSENTRY']._serialized_end=1503
  _globals['_MODELINFERREQUEST_INFERREQUESTEDOUTPUTTENSOR']._serialized_start=1506
  _globals['_MODELINFERREQUEST_INFERREQUESTEDOUTPUTTENSOR']._serialized_end=1773
  _globals['_MODELINFERREQUEST_INFERREQUESTEDOUTPUTTENSOR_PARAMETERSENTRY']._serialized_start=1400
  _globals['_MODELINFERREQUEST_INFERREQUESTEDOUTPUTTENSOR_PARAMETERSENTRY']._serialized_end=1503
  _globals['_MODELINFERREQUEST_PARAMETERSENTRY']._serialized_start=1400
  _globals['_MODELINFERREQUEST_PARAMETERSENTRY']._serialized_end=1503
  _globals['_MODELINFERRESPONSE']._serialized_start=1881
  _globals['_MODELINFERRESPONSE']._serialized_end=2640
  _globals['_MODELINFERRESPONSE_INFEROUTPUTTENSOR']._serialized_start=2175
  _globals['_MODELINFERRESPONSE_INFEROUTPUTTENSOR']._serialized_end=2535
  _globals['_MODELINFERRESPONSE_INFEROUTPUTTENSOR_PARAMETERSENTRY']._serialized_start=1400
  _globals['_MODELINFERRESPONSE_INFEROUTPUTTENSOR_PARAMETERSENTRY']._serialized_end=1503
  _globals['_MODELINFERRESPONSE_PARAMETERSENTRY']._serialized_start=1400
  _globals['_MODELINFERRESPONSE_PARAMETERSENTRY']._serialized_end=1503
  _globals['_INFERPARAMETER']._serialized_start=2642
  _globals['_INFERPARAMETER']._serialized_end=2747
  _globals['_INFERTENSORCONTENTS']._serialized_start=2750
  _globals['_INFERTENSORCONTENTS']._serialized_end=2958
  _globals['_GRPCINFERENCESERVICE']._serialized_start=2961
  _globals['_GRPCINFERENCESERVICE']._serialized_end=3799
# @@protoc_insertion_point(module_scope)
