# Lineage Demo Repository

Demonstrates **direct consumption** of [Lineage](https://github.com/Lineage-org/lineage-baseline) for organization-wide policy enforcement using default policies.

Shows how consumer repositories can:
- Call baseline directly via `nix run github:ORG/baseline#sync`
- Use default Lineage policies without configuration
- Validate policies automatically in CI
- Sync policy updates weekly without manual intervention
- Optionally add configuration for organization branding

Uses reusable workflows from [`Lineage-org/.github`](https://github.com/Lineage-org/.github) and policy definitions from [`Lineage-org/lineage-baseline`](https://github.com/Lineage-org/lineage-baseline).

## Quick Start

This demo repository shows Lineage in action. To set up your own consumer repository, see the [Lineage Baseline Quick Start](https://github.com/Lineage-org/lineage-baseline#quick-start-for-consumer-repos) guide.

**Note:** This repository's CI initially fails because the policy files haven't been materialized yet. This is expected behavior for new consumer repositories. Run `nix run github:Lineage-org/lineage-baseline#sync` to fix.

## How It Works

This repository demonstrates the **direct consumption** pattern:

- **Direct baseline calls** - Uses `nix run github:Lineage-org/lineage-baseline#command`
- **`.github/workflows/policy-sync.yml`** - Runs weekly to sync policy updates
- **`.github/workflows/ci.yml`** - Validates policies are in sync on every push

## Available Commands

```bash
# Sync default policies from baseline
nix run github:Lineage-org/lineage-baseline#sync

# Check if policies are in sync
nix run github:Lineage-org/lineage-baseline#check

# Preview changes without applying
nix run github:Lineage-org/lineage-baseline#sync -- --dry-run

# Select specific packs
nix run github:Lineage-org/lineage-baseline#sync -- --packs editorconfig,license,codeowners

# Override organization name (temporary customization)
nix run github:Lineage-org/lineage-baseline#sync -- --override org.name=MyCompany

# Create new policy pack
nix run github:Lineage-org/lineage-baseline#create-pack <name>

# Import existing policy files
nix run github:Lineage-org/lineage-baseline#import-policy -- --auto

# Fetch license from SPDX
nix run github:Lineage-org/lineage-baseline#fetch-license -- Apache-2.0 --holder "My Company"
```

## Materialized Packs

This demo repository materializes these packs by default:

| Pack | Purpose | Materialized File |
|------|---------|-------------------|
| `editorconfig` | Code formatting standards | `.editorconfig` |
| `license` | Apache 2.0 license | `LICENSE` |
| `security` | Security policy | `SECURITY.md` |
| `codeowners` | Code ownership rules | `.github/CODEOWNERS` |
| `precommit` | Pre-commit hooks | `.pre-commit-config.yaml` |
| `dependabot` | Dependabot config | `.github/dependabot.yml` |

## Policy Sync

### Automatic Updates
The repository syncs policies weekly on Sundays at 2 PM UTC via the Policy Sync workflow. This checks for updates from the baseline stable tag and materializes any new policies.

### Manual Updates
When baseline policies are updated, the CI check will fail with "Out of sync" status. To sync immediately:

Go to Actions tab → Policy Sync workflow → Run workflow

The workflow attempts direct push to main branch but creates a PR if branch protection requires it. Auto-merge is enabled for seamless updates.

### Baseline Update Flow
The baseline repository follows a validation and promotion process: unstable tag triggers validation, successful validation creates a PR for manual review, merging the PR updates the stable tag, consumer repositories detect changes on next sync.

Consumer repositories like this one sync from the stable tag to ensure only validated policies are applied.

## Organization Branding (Optional)

While this demo uses default policies, organizations can add branding via configuration:

**Create `.lineage.toml`:**
```toml
[organization]
name = "MyCompany"
security_email = "security@mycompany.com"
default_team = "@MyCompany/maintainers"

[packs]
enabled = ["editorconfig", "license", "codeowners"]
```

**Sync with configuration:**
```bash
nix run github:Lineage-org/lineage-baseline#sync -- --config .lineage.toml
```

This provides organization-specific branding (company name in CODEOWNERS, security email in SECURITY.md) without requiring baseline forking.

See [lineage-demo2](https://github.com/Lineage-org/lineage-demo2) for a complete configuration-driven example.

## Why This Architecture?

- **Separation of Concerns** - The baseline defines policies, consumers just use them
- **Scalability** - One baseline update propagates to all consumer repositories automatically
- **No PR Bottleneck** - Policy updates materialize instantly without requiring manual review
- **Reproducible** - All policy content is defined declaratively in Nix

For organizations, this eliminates the traditional governance bottleneck where policy updates require hundreds of manual PRs across repositories.