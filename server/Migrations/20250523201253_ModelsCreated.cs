using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ModelsCreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.CreateTable(
                name: "Buildings",
                columns: table => new
                {
                    building_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    address = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("building_pkey", x => x.building_id);
                });

            migrationBuilder.CreateTable(
                name: "UserAccount",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    login = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    avatar_url = table.Column<string>(type: "text", nullable: true),
                    role = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    user_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    user_creation_date = table.Column<DateOnly>(type: "date", nullable: true, defaultValueSql: "CURRENT_DATE")
                },
                constraints: table =>
                {
                    table.PrimaryKey("useraccount_pkey", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "Apartments",
                columns: table => new
                {
                    apartment_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    building_id = table.Column<int>(type: "integer", nullable: true),
                    apartment_number = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("apartment_pkey", x => x.apartment_id);
                    table.ForeignKey(
                        name: "apartment_building_id_fkey",
                        column: x => x.building_id,
                        principalTable: "Buildings",
                        principalColumn: "building_id");
                });

            migrationBuilder.CreateTable(
                name: "Issues",
                columns: table => new
                {
                    issue_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    issuer_id = table.Column<int>(type: "integer", nullable: true),
                    operator_id = table.Column<int>(type: "integer", nullable: true),
                    issue_description = table.Column<string>(type: "text", nullable: true),
                    issue_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    issue_type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    issue_creation_date = table.Column<DateOnly>(type: "date", nullable: true, defaultValueSql: "CURRENT_DATE"),
                    issue_update_date = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("issue_pkey", x => x.issue_id);
                    table.ForeignKey(
                        name: "issue_issuer_id_fkey",
                        column: x => x.issuer_id,
                        principalTable: "UserAccount",
                        principalColumn: "user_id");
                    table.ForeignKey(
                        name: "issue_operator_id_fkey",
                        column: x => x.operator_id,
                        principalTable: "UserAccount",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "Residents",
                columns: table => new
                {
                    resident_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(type: "integer", nullable: true),
                    apartment_id = table.Column<int>(type: "integer", nullable: true),
                    movein_date = table.Column<DateOnly>(type: "date", nullable: true),
                    resident_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    moveout_date = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("resident_pkey", x => x.resident_id);
                    table.ForeignKey(
                        name: "resident_apartment_id_fkey",
                        column: x => x.apartment_id,
                        principalTable: "Apartments",
                        principalColumn: "apartment_id");
                    table.ForeignKey(
                        name: "resident_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "UserAccount",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    orderer_id = table.Column<int>(type: "integer", nullable: true),
                    issue_id = table.Column<int>(type: "integer", nullable: true),
                    cost = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    contractor = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    order_description = table.Column<string>(type: "text", nullable: true),
                    order_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    order_creation_date = table.Column<DateOnly>(type: "date", nullable: true, defaultValueSql: "CURRENT_DATE"),
                    order_end_date = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("order_pkey", x => x.order_id);
                    table.ForeignKey(
                        name: "order_issue_id_fkey",
                        column: x => x.issue_id,
                        principalTable: "Issues",
                        principalColumn: "issue_id");
                    table.ForeignKey(
                        name: "order_orderer_id_fkey",
                        column: x => x.orderer_id,
                        principalTable: "UserAccount",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "Leases",
                columns: table => new
                {
                    lease_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    resident_id = table.Column<int>(type: "integer", nullable: true),
                    apartment_id = table.Column<int>(type: "integer", nullable: true),
                    lease_start_date = table.Column<DateOnly>(type: "date", nullable: true),
                    lease_end_date = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("lease_pkey", x => x.lease_id);
                    table.ForeignKey(
                        name: "tenant_apartment_id_fkey",
                        column: x => x.apartment_id,
                        principalTable: "Apartments",
                        principalColumn: "apartment_id");
                    table.ForeignKey(
                        name: "tenant_resident_id_fkey",
                        column: x => x.resident_id,
                        principalTable: "Residents",
                        principalColumn: "resident_id");
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    payment_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    lease_id = table.Column<int>(type: "integer", nullable: true),
                    approver_id = table.Column<int>(type: "integer", nullable: true),
                    apartment_id = table.Column<int>(type: "integer", nullable: true),
                    payment_amount = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    payment_description = table.Column<string>(type: "text", nullable: true),
                    payment_date = table.Column<DateOnly>(type: "date", nullable: true, defaultValueSql: "CURRENT_DATE"),
                    payment_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("payment_pkey", x => x.payment_id);
                    table.ForeignKey(
                        name: "payment_apartment_id_fkey",
                        column: x => x.apartment_id,
                        principalTable: "Apartments",
                        principalColumn: "apartment_id");
                    table.ForeignKey(
                        name: "payment_approver_id_fkey",
                        column: x => x.approver_id,
                        principalTable: "UserAccount",
                        principalColumn: "user_id");
                    table.ForeignKey(
                        name: "payment_tenant_id_fkey",
                        column: x => x.lease_id,
                        principalTable: "Leases",
                        principalColumn: "lease_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Apartments_building_id",
                table: "Apartments",
                column: "building_id");

            migrationBuilder.CreateIndex(
                name: "IX_Issues_issuer_id",
                table: "Issues",
                column: "issuer_id");

            migrationBuilder.CreateIndex(
                name: "IX_Issues_operator_id",
                table: "Issues",
                column: "operator_id");

            migrationBuilder.CreateIndex(
                name: "IX_Leases_apartment_id",
                table: "Leases",
                column: "apartment_id");

            migrationBuilder.CreateIndex(
                name: "tenant_resident_id_key",
                table: "Leases",
                column: "resident_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_issue_id",
                table: "Orders",
                column: "issue_id");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_orderer_id",
                table: "Orders",
                column: "orderer_id");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_apartment_id",
                table: "Payments",
                column: "apartment_id");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_approver_id",
                table: "Payments",
                column: "approver_id");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_lease_id",
                table: "Payments",
                column: "lease_id");

            migrationBuilder.CreateIndex(
                name: "IX_Residents_apartment_id",
                table: "Residents",
                column: "apartment_id");

            migrationBuilder.CreateIndex(
                name: "IX_Residents_user_id",
                table: "Residents",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "useraccount_login_key",
                table: "UserAccount",
                column: "login",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Issues");

            migrationBuilder.DropTable(
                name: "Leases");

            migrationBuilder.DropTable(
                name: "Residents");

            migrationBuilder.DropTable(
                name: "Apartments");

            migrationBuilder.DropTable(
                name: "UserAccount");

            migrationBuilder.DropTable(
                name: "Buildings");

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IssueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                });
        }
    }
}
