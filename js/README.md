# Patient Data Management System

A modern medical application built with Next.js, TypeScript, Tailwind CSS, and GraphQL for managing and displaying patient medical data.

## Features

- **Patient Management**: Create, read, update, and delete patient records
- **Comprehensive Patient Data**: Store personal information, medical history, allergies, medications, and emergency contacts
- **GraphQL API**: Efficient data fetching and mutations using GraphQL
- **Responsive Design**: Optimized for desktop use in clinical environments
- **Intuitive UI**: Clean, professional interface designed for healthcare professionals

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **API**: GraphQL with Apollo Server
- **Client**: Apollo Client

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── graphql/
│   │       └── route.ts          # GraphQL API endpoint
│   ├── layout.tsx                # Root layout with Apollo Provider
│   ├── page.tsx                  # Main patient management page
│   └── globals.css               # Global styles
├── components/
│   ├── patients/
│   │   ├── PatientCard.tsx       # Patient card component
│   │   ├── PatientForm.tsx       # Patient form component
│   │   └── PatientList.tsx       # Patient list component
│   └── providers/
│       └── ApolloProvider.tsx    # Apollo Client provider
├── lib/
│   ├── apollo-client.ts          # Apollo Client configuration
│   └── graphql/
│       ├── queries.ts            # GraphQL queries and mutations
│       ├── resolvers.ts          # GraphQL resolvers
│       └── schema.ts             # GraphQL schema
└── types/
    └── patient.ts                # TypeScript types for patients
```

## GraphQL API

The application includes a GraphQL API endpoint at `/api/graphql` with the following operations:

### Queries
- `patients`: Get all patients
- `patient(id: ID!)`: Get a single patient by ID

### Mutations
- `createPatient(input: CreatePatientInput!)`: Create a new patient
- `updatePatient(input: UpdatePatientInput!)`: Update an existing patient
- `deletePatient(id: ID!)`: Delete a patient

## Patient Data Model

Each patient record includes:
- Personal information (name, DOB, gender, contact info)
- Medical history
- Allergies
- Current medications
- Emergency contact information

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Notes

- The current implementation uses an in-memory data store for demonstration purposes
- For production use, replace the in-memory store in `src/lib/graphql/resolvers.ts` with a proper database integration
