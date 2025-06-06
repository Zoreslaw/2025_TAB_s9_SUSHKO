using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserManagementModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "building",
                columns: table => new
                {
                    building_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    address = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_building", x => x.building_id);
                });

            migrationBuilder.CreateTable(
                name: "useraccount",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    login = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    avatar_url = table.Column<string>(type: "text", nullable: true),
                    role = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    user_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    user_creation_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_useraccount", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "apartment",
                columns: table => new
                {
                    apartment_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    building_id = table.Column<int>(type: "integer", nullable: false),
                    apartment_number = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_apartment", x => x.apartment_id);
                    table.ForeignKey(
                        name: "FK_apartment_building_building_id",
                        column: x => x.building_id,
                        principalTable: "building",
                        principalColumn: "building_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "issue",
                columns: table => new
                {
                    issue_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    issuer_id = table.Column<int>(type: "integer", nullable: false),
                    operator_id = table.Column<int>(type: "integer", nullable: true),
                    issue_description = table.Column<string>(type: "text", nullable: true),
                    issue_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    issue_type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    issue_creation_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    issue_update_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_issue", x => x.issue_id);
                    table.ForeignKey(
                        name: "FK_issue_useraccount_issuer_id",
                        column: x => x.issuer_id,
                        principalTable: "useraccount",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_issue_useraccount_operator_id",
                        column: x => x.operator_id,
                        principalTable: "useraccount",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "resident",
                columns: table => new
                {
                    resident_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    apartment_id = table.Column<int>(type: "integer", nullable: false),
                    movein_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    resident_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    moveout_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_resident", x => x.resident_id);
                    table.ForeignKey(
                        name: "FK_resident_apartment_apartment_id",
                        column: x => x.apartment_id,
                        principalTable: "apartment",
                        principalColumn: "apartment_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_resident_useraccount_user_id",
                        column: x => x.user_id,
                        principalTable: "useraccount",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "order",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    orderer_id = table.Column<int>(type: "integer", nullable: false),
                    issue_id = table.Column<int>(type: "integer", nullable: true),
                    cost = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    contractor = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    order_description = table.Column<string>(type: "text", nullable: true),
                    order_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    order_creation_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    order_end_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_order", x => x.order_id);
                    table.ForeignKey(
                        name: "FK_order_issue_issue_id",
                        column: x => x.issue_id,
                        principalTable: "issue",
                        principalColumn: "issue_id");
                    table.ForeignKey(
                        name: "FK_order_useraccount_orderer_id",
                        column: x => x.orderer_id,
                        principalTable: "useraccount",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tenant",
                columns: table => new
                {
                    tenant_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    resident_id = table.Column<int>(type: "integer", nullable: false),
                    apartment_id = table.Column<int>(type: "integer", nullable: false),
                    lease_start_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    lease_end_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tenant", x => x.tenant_id);
                    table.ForeignKey(
                        name: "FK_tenant_apartment_apartment_id",
                        column: x => x.apartment_id,
                        principalTable: "apartment",
                        principalColumn: "apartment_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tenant_resident_resident_id",
                        column: x => x.resident_id,
                        principalTable: "resident",
                        principalColumn: "resident_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "payment",
                columns: table => new
                {
                    payment_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tenant_id = table.Column<int>(type: "integer", nullable: false),
                    approver_id = table.Column<int>(type: "integer", nullable: true),
                    apartment_id = table.Column<int>(type: "integer", nullable: false),
                    payment_amount = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    payment_description = table.Column<string>(type: "text", nullable: true),
                    payment_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    payment_status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payment", x => x.payment_id);
                    table.ForeignKey(
                        name: "FK_payment_apartment_apartment_id",
                        column: x => x.apartment_id,
                        principalTable: "apartment",
                        principalColumn: "apartment_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_payment_tenant_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenant",
                        principalColumn: "tenant_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_payment_useraccount_approver_id",
                        column: x => x.approver_id,
                        principalTable: "useraccount",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_apartment_building_id",
                table: "apartment",
                column: "building_id");

            migrationBuilder.CreateIndex(
                name: "IX_issue_issuer_id",
                table: "issue",
                column: "issuer_id");

            migrationBuilder.CreateIndex(
                name: "IX_issue_operator_id",
                table: "issue",
                column: "operator_id");

            migrationBuilder.CreateIndex(
                name: "IX_order_issue_id",
                table: "order",
                column: "issue_id");

            migrationBuilder.CreateIndex(
                name: "IX_order_orderer_id",
                table: "order",
                column: "orderer_id");

            migrationBuilder.CreateIndex(
                name: "IX_payment_apartment_id",
                table: "payment",
                column: "apartment_id");

            migrationBuilder.CreateIndex(
                name: "IX_payment_approver_id",
                table: "payment",
                column: "approver_id");

            migrationBuilder.CreateIndex(
                name: "IX_payment_tenant_id",
                table: "payment",
                column: "tenant_id");

            migrationBuilder.CreateIndex(
                name: "IX_resident_apartment_id",
                table: "resident",
                column: "apartment_id");

            migrationBuilder.CreateIndex(
                name: "IX_resident_user_id",
                table: "resident",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_tenant_apartment_id",
                table: "tenant",
                column: "apartment_id");

            migrationBuilder.CreateIndex(
                name: "IX_tenant_resident_id",
                table: "tenant",
                column: "resident_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_useraccount_login",
                table: "useraccount",
                column: "login",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "order");

            migrationBuilder.DropTable(
                name: "payment");

            migrationBuilder.DropTable(
                name: "issue");

            migrationBuilder.DropTable(
                name: "tenant");

            migrationBuilder.DropTable(
                name: "resident");

            migrationBuilder.DropTable(
                name: "apartment");

            migrationBuilder.DropTable(
                name: "useraccount");

            migrationBuilder.DropTable(
                name: "building");
        }
    }
}
