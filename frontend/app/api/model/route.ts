import { NextResponse } from 'next/server';
import axios from 'axios';

// Set the backend URL
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/model`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, version, description, file } = data;

    const response = await axios.post(`${BACKEND_URL}/api/v1/model_train`, {
      name,
      version,
      description,
      file
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create model' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { modelName, updatedModelData } = data;

    const response = await axios.put(
      `${BACKEND_URL}/api/v1/model/models/${modelName}`,
      updatedModelData
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update model' },
      { status: 500 }
    );
  }
}

// export async function DELETE(request: Request) {
//   try {
//     const { modelName } = new URL(request.url).searchParams;

//     const response = await axios.delete(
//       `${BACKEND_URL}/api/v1/model/${modelName}`
//     );

//     return NextResponse.json({ message: 'Model deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: 'Failed to delete model' },
//       { status: 500 }
//     );
//   }
// }
