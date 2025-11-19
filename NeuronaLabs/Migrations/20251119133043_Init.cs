using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NeuronaLabs.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DiagnosticRecords",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PatientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Timestamp = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    DiagnosisText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiagnosticRecords", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastDiagnosisID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Patients_DiagnosticRecords_LastDiagnosisID",
                        column: x => x.LastDiagnosisID,
                        principalTable: "DiagnosticRecords",
                        principalColumn: "ID");
                });

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "ID", "Age", "Email", "FirstName", "LastDiagnosisID", "LastName", "PasswordHash" },
                values: new object[] { new Guid("11111111-1111-1111-1111-111111111111"), 34, "alice.novak@example.com", "Alice", null, "Novak", "$2y$10$mZANmx707zBLu2aBdDqeJeYzGvnO2Og3IoxgApJQbe.UuFxmrVoz2" });

            migrationBuilder.InsertData(
                table: "DiagnosticRecords",
                columns: new[] { "ID", "DiagnosisText", "Notes", "PatientId", "Timestamp" },
                values: new object[,]
                {
                    { new Guid("22222222-2222-2222-2222-222222222222"), "Seasonal Allergy", "Prescribed antihistamines", new Guid("11111111-1111-1111-1111-111111111111"), new DateTimeOffset(new DateTime(2024, 1, 10, 9, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("33333333-3333-3333-3333-333333333333"), "Sinus Infection", "Recommended antibiotics", new Guid("11111111-1111-1111-1111-111111111111"), new DateTimeOffset(new DateTime(2024, 1, 15, 14, 30, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_DiagnosticRecords_PatientId",
                table: "DiagnosticRecords",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_LastDiagnosisID",
                table: "Patients",
                column: "LastDiagnosisID");

            migrationBuilder.AddForeignKey(
                name: "FK_DiagnosticRecords_Patients_PatientId",
                table: "DiagnosticRecords",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiagnosticRecords_Patients_PatientId",
                table: "DiagnosticRecords");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "DiagnosticRecords");
        }
    }
}
