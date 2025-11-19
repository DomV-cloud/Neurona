using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeuronaLabs.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLastDiagnosisID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
               table: "Patients",
               keyColumn: "ID",
               keyValue: Guid.Parse("11111111-1111-1111-1111-111111111111"),
               column: "LastDiagnosisID",
               value: Guid.Parse("33333333-3333-3333-3333-333333333333")
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
