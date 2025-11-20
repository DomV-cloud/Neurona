using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NeuronaLabs.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Diagnoses",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PatientID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    DiagnosisText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diagnoses", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Diagnoses_Patients_PatientID",
                        column: x => x.PatientID,
                        principalTable: "Patients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "ID", "Age", "Email", "FirstName", "LastName", "PasswordHash" },
                values: new object[] { new Guid("11111111-1111-1111-1111-111111111111"), 34, "kamila.dvorak@example.com", "Kamila", "Dvorak", "$2y$10$mZANmx707zBLu2aBdDqeJeYzGvnO2Og3IoxgApJQbe.UuFxmrVoz2" });

            migrationBuilder.InsertData(
                table: "Diagnoses",
                columns: new[] { "ID", "CreatedAt", "DiagnosisText", "Notes", "PatientID", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("22222222-2222-2222-2222-222222222222"), new DateTimeOffset(new DateTime(2024, 1, 10, 9, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Mild cognitive impairment (MCI)", "Pacient si stěžuje na zhoršení krátkodobé paměti za posledních 6 měsíců. MMSE 26/30. Doporučeno MRI mozku a kognitivní trénink.", new Guid("11111111-1111-1111-1111-111111111111"), new DateTimeOffset(new DateTime(2024, 1, 10, 9, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("33333333-3333-3333-3333-333333333333"), new DateTimeOffset(new DateTime(2024, 1, 15, 14, 30, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Early Alzheimer’s disease – suspicion", "Kontrola po 3 měsících: MMSE 24/30. MRI mozku ukazuje mírnou atrofii hippocampu bilaterálně. Nasazen donepezil 5 mg, kontrola za 3 měsíce.", new Guid("11111111-1111-1111-1111-111111111111"), new DateTimeOffset(new DateTime(2024, 1, 15, 14, 30, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Diagnoses_PatientID",
                table: "Diagnoses",
                column: "PatientID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Diagnoses");

            migrationBuilder.DropTable(
                name: "Patients");
        }
    }
}
