package com.osko.launcher

/**
 * Living World master architecture notes encoded beside the V11 duplicate.
 *
 * Goal: keep the world as one shared coordinate space so the background,
 * roads, buildings, Aurora routes, animals, lights and future robot markers
 * all move together when the user pans or zooms.
 *
 * This file is intentionally isolated on the v11-coded-duplicate branch.
 */
object LivingWorldMasterPlan {
    const val MIN_SCALE = 0.88f
    const val MAX_SCALE = 2.70f
    const val DEFAULT_SCALE = 1.0f

    data class WorldPoint(val x: Float, val y: Float)

    data class RoadPath(
        val id: String,
        val points: List<WorldPoint>
    )

    data class BuildingAnchor(
        val id: String,
        val position: WorldPoint,
        val scale: Float = 1.0f
    )

    data class MovingEntityRoute(
        val id: String,
        val roadId: String,
        val speed: Float,
        val loop: Boolean = true
    )

    /*
     * Future implementation rule:
     * 1. User gesture changes only the world camera (scale + offset).
     * 2. Every fixed object stores normalized world coordinates.
     * 3. Roads are paths in the same coordinate system.
     * 4. Aurora and other moving entities follow named road paths.
     * 5. UI controls stay screen-anchored and do not drift with the world.
     * 6. AI may request approved destinations/actions later, but it does not
     *    directly own motion limits, safety rules or robot motor control.
     */
}
